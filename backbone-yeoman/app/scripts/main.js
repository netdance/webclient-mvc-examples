/*global require*/
/* jshint undef: true, unused: false */  /* for the bootstrap entry */

'use strict';

require(['config'], function() {

    require([
        'backbone', 'bootstrap',
    ], function (Backbone, bootstrap) {
        $(function() {
            require([
                'routes/main', 'views/navigationbar', 'views/navsearch', 'views/alert'
            ],
            function (MainRouter, NavigationBarView, NavsearchView, AlertView) {
                    Backbone.history.start();
                    new AlertView();
                    new NavigationBarView();
                    new NavsearchView();
                });
        
        });
    });

});
