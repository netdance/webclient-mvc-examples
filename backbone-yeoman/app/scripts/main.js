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
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
});

require([
    'backbone', 'bootstrap', 
], function (Backbone, bootstrap) {
    $(function() {
        require([
            'views/navigationbar', 'views/navsearch', 'views/main','routes/main'
        ], function (NavigationBarView, NavsearchView, MainView, MainRouter) {
                new NavigationBarView();
                new NavsearchView();
                var main = new MainView();
                new MainRouter({mainView: main});
                Backbone.history.start();
        })
    
    });
});
