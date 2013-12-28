/*jslint browser: true, sloppy: true, indent: 4, plusplus: true */
/*globals $ */


/*
  Note:  This implementation isn't really polished.  In particular, I haven't completely decoupled the view and the
  business logic to my satisfaction, nor have I implemented a full controller.  I did this project primarily as a
  way to get a feel for pain points that could be solved by JavaScript libraries.
 */

// IIFE, passing jquery $ function object
var jqproduct = function ($) {
    var pub = {},
    // selectors for owning page all go here, to decouple page with code
        htmlMap = {
            homeContainer: '#landingContainer',
            categoriesPage: '#categoriesContainer',
            productAddPage: '#productAddContainer',
            productsPage: '#productContainer',
            previousCategoriesButton: '#previousCategories',
            previousCategoriesLink: '#previousCategoriesLink',
            nextCategories: '#nextCategories',
            nextCategoriesLink: '#nextCategoriesLink',
            addCategoryButton: '#categoryAddRegion a',
            addCategorySubmitButton: '#categoryAddRegion button',
            deleteCategoryTemplate: '#catBtns',
            deleteCategoryButtons: '.category-delete-button',
            categoryTableBody: '#categoryTable > tbody',
            alertTemplate: '#addAlert',
            productPager: '#productPager',
            categoryPager: '#categoryPager',
            productTableDescriptionCell: '#productTable > tbody > tr > td + td + td',
            productTableRowInsertionPoint: '#productTable > tbody',
            searchNavButtonHolder: '#search-nav-btn-holder',
            searchNavType: '#search-nav-btn-{0}',
            searchInput: '#searchinput',
            deleteProductTemplate: '#productBtns',
            deleteProductButtons: '.product-delete-button',
            addProductButton: '#productAddButton',
            addProductName: '#addProductName',
            addProductPrice: '#addProductPrice',
            addProductDescription: '#addProductDescription',
            addForm: '#addForm',
            addProductCategoriesAnchor: '#addProductCategories',
            addProductCategoriesCheckbox: '#catCheckbox',
            previousProductsLink: '#previousProductsLink',
            nextProductsLink: '#nextProductsLink',
            productAlertAnchor: '#productContainer .alertAnchor',
            categoryAlertAnchor: '#categoriesContainer .alertAnchor',
            categoryIdAttribute: 'data-jqproduct-catId',
            productIdAttribute: 'data-jqproduct-prodId',
            categoriesLoading: 'thead',
            productsLoading: 'thead'
        };

    pub.displayHome = function displayHome() {
        showPage(htmlMap.homeContainer);
    };

    pub.displayCategoriesPage = function displayCategoriesPage() {

        var baseAnchor = '#categories&page=';
        var currentPage = jqcontroller.getParam('page');
        var search = jqcontroller.getParam('search');

        if (!!jqcontroller.getParam('add')) {
            enableAddCategory();
        } else {
            disableAddCategory();
        }

        if (isIntNumber(currentPage)) {
            currentPage = parseInt(currentPage, 10);
        } else {
            currentPage = 1;
        }
        if (currentPage < 1) {
            return;
        }

        if (!!search) {
            switchSearch();
            search = encodeURIComponent(search);
            baseAnchor = '#categories&search=' + search + '&page=';
            $(htmlMap.searchInput).val('');
        }

        // Setup the add button to stay on the same page when it's called
        $(htmlMap.addCategoryButton).attr('href', baseAnchor + currentPage + '&add=y');

        $(htmlMap.categoriesLoading).addClass('ajax-loading');

        qedModel.getCategories({
            page: currentPage,
            search: search,
            success: onFetchSuccess,
            complete: onFetchAlways
        });
        showPage(htmlMap.categoriesPage);

        function onFetchAlways() {
            $(htmlMap.categoriesLoading).removeClass('ajax-loading');
        }

        function onFetchSuccess(catalog) {
            var $tab = $(htmlMap.categoryTableBody);
            if (catalog.length === 0) {
                if (currentPage > 1) {
                    currentPage--;
                }
                location.hash = baseAnchor + currentPage + (( !!jqcontroller.getParam('add')) ? '&add=y' : '');
                if (currentPage === 1) {
                    $tab.empty();
                }
                updateCategoriesNavButtons(currentPage, true, (currentPage === 1));
                return;
            }
            $tab.empty();
            $.each(catalog, function (index, category) {
                if (!$.isNumeric(category.id)) {
                    throw new Error('bad data from server, non numeric category id');
                }
                var name = jqutil.htmlEscape(category.name);
                var $tr = $('<tr><td><a href="#products&cat=' + category.id + '">' + name + '</a></td></tr>');
                var $delBtn = $(htmlMap.deleteCategoryTemplate).clone().removeAttr('id').attr(htmlMap.categoryIdAttribute, category.id);
                $('td', $tr).append($delBtn);
                $tab.append($tr);
            });
            $(htmlMap.deleteCategoryButtons, $tab).click(function () {
                catDel(this);
            });
            updateCategoriesNavButtons(currentPage, (catalog.length < 10), (catalog.length < 10 && currentPage === 1));
        }

        function updateCategoriesNavButtons(pageNum, isEndPage, hidePager) {
            if (hidePager) {
                $(htmlMap.categoryPager).hide();
            } else {
                $(htmlMap.categoryPager).show();
            }
            var previousValue = pageNum - 1,
                nextValue = pageNum + 1;
            if (previousValue <= 0) {
                previousValue = 1;
                $(htmlMap.previousCategoriesButton).addClass('disabled');
            } else {
                $(htmlMap.previousCategoriesButton).removeClass('disabled');
            }
            if (isEndPage) {
                $(htmlMap.nextCategories).addClass('disabled');
            } else {
                $(htmlMap.nextCategories).removeClass('disabled');
            }
            $(htmlMap.previousCategoriesLink).attr('href', baseAnchor + previousValue);
            $(htmlMap.nextCategoriesLink).attr('href', baseAnchor + nextValue);
        }
    };

    pub.displayProductsPage = function displayProductsPage() {
        var baseAnchor = '#products&page=',
            currentPage = jqcontroller.getParam('page'),
            search = jqcontroller.getParam('search'),
            cat = jqcontroller.getParam('cat');

        if (isIntNumber(currentPage)) {
            currentPage = parseInt(currentPage, 10);
        } else {
            currentPage = 1;
        }
        if (currentPage < 1) {
            return;
        }
        if (!!search) {
            switchSearch();
            baseAnchor = '#products&search=' + search + '&page=';
            search = encodeURIComponent(search);
            $(htmlMap.searchInput).val('');
        }
        if (!!cat) {
            baseAnchor = '#products&cat=' + cat + '&page=';
        }
        $(htmlMap.productsLoading).addClass('ajax-loading');

        qedModel.getProducts({
            page: currentPage,
            search: search,
            cat: cat,
            success: successCallback,
            complete: alwaysCallback
        });
        showPage(htmlMap.productsPage);

        function successCallback(products) {
            var $tab = $(htmlMap.productTableRowInsertionPoint);

            if (products.length === 0) {
                if (currentPage > 1) {
                    currentPage--;
                }
                location.hash = baseAnchor + currentPage;
                if (currentPage === 1) {
                    $tab.empty();
                }
                updateProductsNavButtons(currentPage, true, (currentPage === 1));
                return;
            }
            $tab.empty();
            $.each(products, function (index, product) {
                // in a production application, we'd deal with price differently
                var name = jqutil.htmlEscape(product.name);
                var description = jqutil.htmlEscape(product.description);
                if (!$.isNumeric(product.price)) {
                    throw new Error('data error, prouct price not numeric from server');
                }
                if (!$.isNumeric(product.id)) {
                    throw new Error('data error, product id not numeric from server');
                }
                // TODO hoist to htmlMap
                var trstr = '<tr><td>{0}</td><td>{1}</td><td>{2}<span class="productId" hidden="true">{3}</span></td></tr>';
                var $delBtn = $(htmlMap.deleteProductTemplate).clone().removeAttr('id').attr(htmlMap.productIdAttribute, product.id);
                var $tr = $(trstr.format(name, Number(product.price).toFixed(2), description, product.id));
                $('td + td + td', $tr).append($delBtn);
                $tab.append($tr);
            });
            $(htmlMap.deleteProductButtons, $tab).click(function () {
                prodDel(this);
            });
            updateProductsNavButtons(currentPage, (products.length < 10), (products.length < 10 && currentPage === 1));
        }

        function alwaysCallback() {
            $(htmlMap.productsLoading).removeClass('ajax-loading');
        }

        function updateProductsNavButtons(pageNum, isEndPage, hidePager) {
            var previousValue = pageNum - 1,
                nextValue = pageNum + 1;
            if (hidePager) {
                $(htmlMap.productPager).hide();
            } else {
                $(htmlMap.productPager).show();
            }
            if (previousValue <= 0) {
                previousValue = 1;
                $('#previousProducts').addClass('disabled');
            } else {
                $('#previousProducts').removeClass('disabled');
            }
            if (isEndPage) {
                $('#nextProducts').addClass('disabled');
            } else {
                $('#nextProducts').removeClass('disabled');
            }
            $(htmlMap.previousProductsLink).attr('href', baseAnchor + previousValue);
            $(htmlMap.nextProductsLink).attr('href', baseAnchor + nextValue);
        }
    };


    pub.displayProductAddPage = function displayProductAddPage() {
        showPage(htmlMap.productAddPage);
        var currentPage = 1;
        var categoriesList = [];

        var categoriesSuccess = function categoriesSuccess(data) {
            $.each(data, function (index, value) {
                categoriesList.push(value);
            });
            if (data.length < 10) {
                //done
                setupCategories(categoriesList);
            } else {
                //get more
                currentPage++;
                qedModel.getCategories({
                    page: currentPage,
                    success: categoriesSuccess
                });
            }
        };

        qedModel.getCategories({
            page: currentPage,
            success: categoriesSuccess
        });

        function setupCategories(list) {
            var $categoriesSection = $(htmlMap.addProductCategoriesAnchor);
            $categoriesSection.empty();
            $.each(list, function (index, value) {
                var newChk = $(htmlMap.addProductCategoriesCheckbox).clone().removeAttr('id');
                $('input', newChk).attr(htmlMap.categoryIdAttribute, value.id);
                $('span', newChk).text(value.name);
                $categoriesSection.append(newChk);
            });
        }
    };

    pub.prodAdd = function prodAdd() {
        showPage(htmlMap.productAddPage);
    };

    pub.initializeModule = function initializeModule() {
        setupAddProductButtonClick();
        setupAddCategoryButtonClick();
        setupSearchInputBlur();
        //setupDeleteCategoryButtonClick();
    };

    var addProduct = function addProduct() {
        var endpoint = '/products.json';
        var name = $(htmlMap.addProductName).val();
        var price = $(htmlMap.addProductPrice).val();
        var description = $(htmlMap.addProductDescription).val();

        var category_id_list = [];
        $('input:checked', htmlMap.addForm).each(function (index, element) {
            category_id_list.push($(element).attr(htmlMap.categoryIdAttribute));
        });
        var payload = {
            'product[name]': name,
            'product[price]': price,
            'product[description]': description,
            'product[category_ids]': category_id_list
        };

        $.ajax({
            type: 'POST',
            url: endpoint,
            data: payload,
            success: function () {
                location.hash = '#products';
                pub.displayProductsPage();
                showAlert('Successfully added product named ' + name, false, 'product');
            },
            error: function () {
                location.hash = '#products';
                showAlert('Error adding product named ' + name, true, 'product');
            },
            dataType: 'json'
        });
        location.hash = '#products';
    };

    var addCategory = function addCategory() {
        var name = $('#newCategoryName').val();
        var endpoint = '/categories.json';
        var data = {
            '_method': 'post',
            'category[name]': name
        };

        $.ajax({
            type: 'POST',
            url: endpoint,
            data: data,
            success: function () {
                location.hash = '#categories';
                pub.displayCategoriesPage();
                showAlert('Successfully added category named ' + name, false, 'category');
            },
            error: function () {
                location.hash = '#categories';
                disableAddCategory();
                showAlert('Error adding category named ' + name, true, 'category');
            },
            dataType: 'json'
        });
    };


    //////////////// Begin event handler block  ///////////////////

    function setupAddProductButtonClick() {
        $(htmlMap.addProductButton).click(addProduct);
    }

    function setupAddCategoryButtonClick() {
        $(htmlMap.addCategorySubmitButton).click(addCategory);
    }

    function setupSearchInputBlur() {
        // update search hash when search term entered
        $(htmlMap.searchInput).blur(function () {
            $('.search-btn').each(function (index, element) {
                var hash = $(element).attr('href');
                var page = jqcontroller.getPage(hash);
                var search = $(htmlMap.searchInput).val();
                var target = '#' + page + '&search=' + search;
                $(element).attr('href', target);
            });
        });
    }

    //////////////// End event handler block /////////////////////

    function catDel(btn) {
        qedModel.deleteCategory({
            cat: $(btn).parent().attr(htmlMap.categoryIdAttribute),
            success: function () {
                pub.displayCategoriesPage();
                showAlert('Successfully deleted category', false, 'category');
            },
            error: function () {
                showAlert('Error deleting category', true, 'category');
            }
        });
    }

    function prodDel(btn) {
        var product = $(btn).parent().attr(htmlMap.productIdAttribute);
        qedModel.deleteProduct({
            product: product,
            success: function () {
                pub.displayProductsPage();
                showAlert('Successfully deleted product', false, 'product');
            },
            error: function () {
                showAlert('Error deleting product', true, 'product');
            }
        });
    }

    function showPage(pageId) {
        $('.container:not(' + pageId + ')').hide();
        $(pageId).show();
    }

    function isIntNumber(n) {
        return !isNaN(parseInt(n, 10)) && isFinite(n);
    }

    function enableAddCategory() {
        $('#addCategoryBtn').hide();
        $('#addCategoryInput').show();
    }

    function disableAddCategory() {
        $('#addCategoryInput').hide().find('input').val('');
        $('#addCategoryBtn').show();
    }


    function showAlert(str, isError, type) {
        var alertAnchor,
            $alert = $(htmlMap.alertTemplate);
        if (type === 'category') {
            alertAnchor = htmlMap.categoryAlertAnchor;
        } else if (type === 'product') {
            alertAnchor = htmlMap.productAlertAnchor;
        } else {
            return;
        }
        $(alertAnchor).empty();
        var $newAddAlert = $alert.clone().removeAttr('id');
        $($newAddAlert).find('span').text(str);
        if (isError) {
            $newAddAlert.addClass('alert-danger');
        } else {
            $newAddAlert.addClass('alert-success');
        }
        $(alertAnchor).append($newAddAlert);
        $('.alert', alertAnchor).fadeIn(200).delay(3000).fadeOut(1000);
    }

    function switchSearch() {
        var container = jqcontroller.getPage();
        if (container === 'categories' || container === 'products') {
            var holder = $(htmlMap.searchNavButtonHolder);
            holder.empty();
            var target = $(htmlMap.searchNavType.format(container)).clone(true);
            holder.append(target);
        }
    }

    return pub;

}($);
// end IIFE

// begin controller IIFE
var jqcontroller = (function ($) {

    // routing table
    var routingTable = {
            home: jqproduct.displayHome,
            products: jqproduct.displayProductsPage,
            categories: jqproduct.displayCategoriesPage,
            productAdd: jqproduct.displayProductAddPage,
            defaultPage: jqproduct.displayHome
        },
        defaultPage = jqproduct.displayHome;


    // Public function block
    var pub = {
        // return the hash part of an anchor, less params
        // expected format of navigation hashes is #page&param=value&param2=value
        getPage: function getPage(str) {
            var hash, page;

            if (!!str) {
                hash = str;
            } else {
                hash = location.hash;
            }

            hash = hash.slice(1);
            page = hash.split('&')[0];
            return page;
        },

        // return params part of an anchor
        // expected format of navigation hashes is #page&param=value&param2=value
        getParams: function getParams(str) {
            var ret = {},
                pairs,
                hash;

            if (!!str) {
                hash = str;
            } else {
                hash = location.hash;
            }
            pairs = hash.split('&');
            pairs.shift();
            pairs.forEach(function getvals(pair) {
                var spair = pair.split('=');
                ret[spair[0]] = spair[1];
            });
            return ret;
        },

        // return single param value, or undefined if not found
        // expected format of navigation hashes is #page&param=value&param2=value
        getParam: function getParam(str, url) {
            return pub.getParams(url)[str];
        },

        // overall routing function
        route: function route(url) {
            try {
                var page = pub.getPage();
                var hash = url.split('#')[1];
                if (!!hash) {
                    location.hash = hash;
                }
                if (!page || !routingTable[page]) {
                    defaultPage();
                } else {
                    routingTable[page]();
                }
            } catch (error) {
                // in production, this could write to console, 
                // or do something else useful with error reporting
                window.alert(error);
            }
        },
        initializeModule: function initializeModule() {
            hashChangeHanderSetup();
            // initial route
            jqcontroller.route(location.hash);
        }
    };

    ///  begin handler block  ///
    function hashChangeHanderSetup() {
        // when the hash changes, go through the router
        $(window).on('hashchange', function router() {
            jqcontroller.route(location.hash);
        });
    }

    ///  end handler block ///

    return pub;
}($));
// end controller IIFE

var qedModel = (function ($) {
    return {
        /*
         * error: method to run on error in ajax call
         * success: method to run on success of ajax call, taking a data param
         * complete: method to run on completion of ajax call
         * page: page selector for query
         * search: URLEncoded query selector
         */
        getCategories: function getCategories(params) {
            var error = params.error || null;
            var success = params.success || null;
            var complete = params.complete || null;
            var page = params.page || 1;
            var search = params.search;
            var endpoint = '/categories.json?';
            if (!!search) {
                endpoint = endpoint + '&q=' + search;
            }
            endpoint = endpoint + '&page=' + page;
            $.ajax({
                type: 'GET',
                url: endpoint,
                success: success,
                error: error,
                complete: complete,
                dataType: 'json'
            });
        },
        /*
         * error: method to run on error in ajax call
         * success: method to run on success of ajax call, taking a data param
         * complete: method to run on completion of ajax call
         * page: page selector for query
         * search: URLEncoded query selector
         * category: category selector
         */
        getProducts: function getProducts(params) {
            var error = params.error || null;
            var success = params.success || null;
            var complete = params.complete || null;
            var page = params.page || 1;
            var search = params.search;
            var endpoint;
            if ($.isNumeric(params.cat)) {
                endpoint = '/categories/' + params.cat + '/products.json?';
            } else {
                endpoint = '/products.json?';
            }
            if (!!search) {
                endpoint = endpoint + '&q=' + search;
            }
            endpoint = endpoint + '&page=' + page;
            $.ajax({
                type: 'GET',
                url: endpoint,
                success: success,
                error: error,
                complete: complete,
                dataType: 'json'
            });
        },
        /*
         * error: method to run on error in ajax call
         * success: method to run on success of ajax call, taking a data param
         * complete: method to run on completion of ajax call
         * category: category id to delete
         */
        deleteCategory: function deleteCategory(params) {
            var error = params.error || null;
            var success = params.success || null;
            var complete = params.complete || null;
            var cat = params.cat;
            if (!$.isNumeric(cat)) {
                return;
            }
            var endpoint = '/categories/' + cat + '.json';
            $.ajax({
                // guess which browser doesn't do DELETE
                type: 'POST',
                url: endpoint,
                success: success,
                error: error,
                complete: complete,
                data: {
                    '_method': 'delete'
                }
            });
        },
        /*
         * error: method to run on error in ajax call
         * success: method to run on success of ajax call, taking a data param
         * complete: method to run on completion of ajax call
         * category: category id to delete
         */
        deleteProduct: function deleteProduct(params) {
            var error = params.error || null;
            var success = params.success || null;
            var complete = params.complete || null;
            var product = params.product;
            if (!$.isNumeric(product)) {
                return;
            }
            var endpoint = '/products/' + product + '.json';
            $.ajax({
                // guess which browser doesn't do DELETE
                type: 'POST',
                url: endpoint,
                success: success,
                error: error,
                complete: complete,
                data: {
                    '_method': 'delete'
                }
            });
        }
    };
}($));

//start utility IIFE
var jqutil = (function () {
    return {
        htmlEscape: function htmlEscape(str) {
            var chr = {
                '"': '&quot;',
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;'
            };
            return str.replace(/["&<>]/g, function (a) {
                return chr[a];
            });
        },
        initializeModule: function initializeModule() {
            consoleFix();
            strFormatPrototype();
        }
    };
    //// begin behavior block ////
    function consoleFix() {
        // ie console fix
        if (!window.console) {
            window.console = {};
            window.console.log = function(s) {
            };
        }
    }

    function strFormatPrototype() {
        // String format function
        // replaces {number} with arg[number], allows escape of "{}" with "{{}}""
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
                if (m === '{{') {
                    return '{';
                }
                if (m === '}}') {
                    return '}';
                }
                return args[n];
            });
        };
    }

    //// end behavior block ////
}());
//end utility IIFE

//// begin Bootstrap view modifier IIFE
var jqview = (function ($) {
    return {
        initializeModule: function initializeModule() {
            // turn on popovers
            $('[data-toggle=popover]').popover();
        }
    };
}($));
//// end Bootstrap view modmifier IIFE

// init onload
$(function () {
    jqutil.initializeModule();
    jqview.initializeModule();
    jqproduct.initializeModule();
    jqcontroller.initializeModule();
});


//@sourceURL=jqproduct.js