/*global define*/

define([
    'jquery',
    'backbone',
    'views/main',
], function ($, Backbone, MainView) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
            routes: {
                'categories(/s=:search)(/p:page)': 'categories',
                'products(/c:cat)(/s=:search)(/p:page)': 'products',
                'products/add': 'addProduct',
                'home': 'home',
                '': 'home'
            },
            mainView: null,
            initialize: function() {
                this.mainView = new MainView();
            },
            products: function products(cat,search,page) {
                var mainView = this.mainView;
                var url = '/products';
                if (cat) {
                    url += '/c' + encodeURIComponent(cat);
                }
                if (search) {
                    url += '/s='+ encodeURIComponent(search);
                }
                if (page) {
                    url += 'p'+ encodeURIComponent(page);
                }
                this.navigate(url);
                require([
                    'collections/product',
                    'views/products'
                ], function (ProductCollection, ProductsView) {
                    console.log('in products router');
                    if (!page || page <1) {
                        page = 1;
                    }
                    var collection = new ProductCollection({
                        page: page,
                        cat: cat,
                        search: search
                    });
                    var listView = new ProductsView({
                        collection: collection,
                        $container: mainView.$el
                    });
                    mainView.render({
                        child: listView
                    });
                    // emit a reset to signal our view to render
                    collection.fetch({
                        reset: true
                    });
                });
            },
            categories: function categories(search,page) {
                var mainView = this.mainView;
                var url = '/categories';
                if (search) {
                    url += '/s='+ encodeURIComponent(search);
                }
                if (page) {
                    url += 'p'+ encodeURIComponent(page);
                }
                this.navigate(url);
                require([
                    'collections/category',
                    'views/categories'
                ],
                    function (CategoryCollection, CategoriesView) {
                        console.log('in categories router');
                        if (!page || page <1) {
                            page = 1;
                        }
                        var collection = new CategoryCollection({
                            page: page,
                            search: search
                        });
                        var listView = new CategoriesView({
                            collection: collection,
                            $container: mainView.$el,
                            page: page
                        });
                        mainView.render({
                            child: listView
                        });
                        // emit a reset to signal our view to render
                        collection.fetch({
                            reset: true
                        });
                    }
                );
            },
            addProduct: function addProduct() {
                var mainView = this.mainView;
                this.navigate('/products/add');
                require([
                    'collections/category',
                    'collections/product',
                    'views/product-add'
                ],
                    function (CategoryCollection, ProductCollection, ProductAddView) {

                        console.log('in addProduct router ');
                        var collection = new ProductCollection({});
                        var categoryCollection = new CategoryCollection({});
                        var addProductView = new ProductAddView({
                            collection: collection,
                            categoryCollection: categoryCollection,
                            $container: mainView.$el
                        });
                        mainView.render({
                            child: addProductView
                        });
                        // will emit a 'fetchedAll' event when done
                        categoryCollection.fetchAll();
                    }
                );
            },
            home: function home() {
                this.navigate('/home');
                console.log('in home router');
                this.mainView.showLanding();
            }
	    });

    var router = new MainRouter();

    return router;
});