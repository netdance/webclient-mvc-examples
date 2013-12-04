/*
    Front controller for our application.
    Relies on the MainAnchor View to do page management.
    Note that with the exception of the landing page, we're creating new views (and associated collections)
    for every page landing.  This means that:
    1) We need to not have any listeners on the collections and models
    2) We need to have cleanup actions performed by the page manager (MainAnchor)
 */

App.Routers.Main = Backbone.Router.extend({
    routes: {
        'categories(/s=:search)(/p:page)': 'categories',
        'products(/c:cat)(/s=:search)(/p:page)': 'products',
        'products/add': 'addProduct',
        'home': 'home',
        '': 'home'
    },
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
    home: function() {
        console.log('in home router');
        App.mainAnchor.showLanding();
    }
});
