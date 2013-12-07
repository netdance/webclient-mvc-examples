/*global require*/
/* jshint undef: true, unused: false */  /* for the bootstrap entry */

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
            'routes/main', 'views/navigationbar', 'views/navsearch', 'views/alert'
        ],
        function (MainRouter, NavigationBarView, NavsearchView, AlertView) {
                new MainRouter();
                Backbone.history.start();
                new AlertView();
                new NavigationBarView();
                new NavsearchView();
            });
    
    });
});
