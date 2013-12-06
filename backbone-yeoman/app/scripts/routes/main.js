/*global define*/

define([
    'jquery',
    'backbone',
    'views/main',
    'collections/product',
    'collections/category',
    'views/products',
    'views/categories',
    'views/product-add'
], function ($, Backbone, MainView, ProductCollection, CategoryCollection, ProductsView, CategoriesView, ProductAddView) {
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
                    $container: this.mainView.$el
                });
                this.mainView.render({
                    child: listView
                });
                // emit a reset to signal our view to render
                collection.fetch({
                    reset: true
                });
            },
            categories: function categories(search,page) {
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
                    $container: this.mainView.$el,
                    page: page
                });
                this.mainView.render({
                    child: listView
                });
                // emit a reset to signal our view to render
                collection.fetch({
                    reset: true
                });
            },
            addProduct: function addProduct() {
                console.log('in addProduct router ');
                var collection = new ProductCollection({});
                var categoryCollection = new CategoryCollection({});
                var addProductView = new ProductAddView({
                    collection: collection,
                    categoryCollection: categoryCollection,
                    $container: this.mainView.$el
                });
                this.mainView.render({
                    child: addProductView
                });
                // will emit a 'fetchedAll' event when done
                categoryCollection.fetchAll();
            },
            home: function home() {
                console.log('in home router');
                this.mainView.showLanding();
            }

	    });
    
    return MainRouter;
});