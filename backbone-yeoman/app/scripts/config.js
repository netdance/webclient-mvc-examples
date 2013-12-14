/*global require*/

'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        CategoryModel: 'models/category',
        ProductModel: 'models/product',
        CategoryCollection: 'collections/category',
        ProductCollection: 'collections/product',
        Router: 'routes/main',
        Alerts: 'views/alert',
        NavSearch: 'views/navsearch',
        NavBar: 'views/navigationbar',
        MainView: 'views/main',
        CategoryView: 'views/category',
        CategoriesView: 'views/categories',
        ProductView: 'views/product',
        ProductsView: 'views/products',
        PagerView: 'views/pager',
        Landing: 'views/landing',
        ProductAddView: 'views/product-add'
    }
});
