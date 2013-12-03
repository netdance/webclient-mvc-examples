App.Views.NavSearch = Backbone.View.extend({
    defaultSearchSelector: '#search-nav-btn-holder',
    productSearchSelector: '#search-nav-btn-products',
    categorySearchSelector: '#search-nav-btn-categories',
    searchInputSelector: '#searchinput',
    events: {
        'click .search-product': 'searchProduct',
        'click .search-category': 'searchCategory'
    },
    el: '.navbar-form',
    $productSearch: null,
    $categorySearch: null,
    $defaultSearch: null,
    $searchInput: null,
    initialize: function() {
        console.log('initializing nav search');
        this.$productSearch = this.$(this.productSearchSelector);
        this.$categorySearch = this.$(this.categorySearchSelector);
        this.$defaultSearch = this.$(this.defaultSearchSelector);
        this.$searchInput = this.$(this.searchInputSelector);
    },
    searchProduct: function() {
        var searchTerm = this.$searchInput.val();
        console.log('searching products for '+searchTerm);
        this.$defaultSearch.hide();
        this.$categorySearch.hide();
        this.$productSearch.show();
        App.browser.navigate('/products/s='+searchTerm,{trigger: true});
    },
    searchCategory: function() {
        var searchTerm = this.$searchInput.val();
        console.log('searching categories for '+searchTerm);
        this.$defaultSearch.hide();
        this.$productSearch.hide();
        this.$categorySearch.show();
        App.browser.navigate('/categories/s='+searchTerm,{trigger: true});
    }
});