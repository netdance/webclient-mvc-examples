/*global define*/

define([
    'jquery',
    'backbone',
    'views/main'
], function ($, Backbone, MainView) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
            routes: {
                //'categories(/s=:search)(/p:page)': 'categories',
                //'products(/c:cat)(/s=:search)(/p:page)': 'products',
                //'products/add': 'addProduct',
                'home': 'home',
                '': 'home'
            },
            mainView: null,
            initialize: function() {
                this.mainView = new MainView();
            },
            /*
            products: function(cat,search,page) {
                console.log('in products router');
                if (!page || page <1) {
                    page = 1;
                }
                var collection = new App.Collections.Products({
                    page: page,
                    cat: cat,
                    search: search
                });
                var listView = new App.Views.Products({
                    collection: collection,
                    $container: App.mainAnchor.$el
                });
                App.mainAnchor.render({
                    $child: listView
                });
                // emit a reset to signal our view to render
                collection.fetch({
                    reset: true
                });
            },
            categories: function(search,page) {
                console.log('in categories router');
                if (!page || page <1) {
                    page = 1;
                }
                var collection = new App.Collections.Categories({
                    page: page,
                    search: search
                });
                var listView = new App.Views.Categories({
                    collection: collection,
                    $container: App.mainAnchor.$el,
                    page: page
                });
                App.mainAnchor.render({
                    $child: listView
                });
                // emit a reset to signal our view to render
                collection.fetch({
                    reset: true
                });
            },
            addProduct: function() {
                console.log('in addProduct router ');
                var collection = new App.Collections.Products({
                });
                var categoryCollection = new App.Collections.Categories({
                });
                var addProductView = new App.Views.ProductAdd({
                    collection: collection,
                    categoryCollection: categoryCollection,
                    $container: App.mainAnchor.$el
                });
                App.mainAnchor.render({
                    $child: addProductView
                });
                // will emit a 'fetchedAll' event when done
                categoryCollection.fetchAll();
            },
            */
            home: function() {
                console.log('in home router');
                this.mainView.showLanding();
            }

	    });

    return new MainRouter();
});