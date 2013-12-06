/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'routes/main'
], function ($, _, Backbone, JST, mainRouter) {
    'use strict';

    var NavigationbarView = Backbone.View.extend({
        events: {
            'click .navbar-brand': 'onBrandClick',
            'click #productNavLink': 'onProductClick',
            'click #categoryNavLink': 'onCategoryClick'
        },
        el: '#topnav',
        onBrandClick: function () {
            mainRouter.navigate('/home', {
                trigger: true
            });
        },
        onProductClick: function () {
            mainRouter.navigate('/products', {
                trigger: true
            });
        },
        onCategoryClick: function () {
            mainRouter.navigate('/categories', {
                trigger: true
            });
        }
    });

    return NavigationbarView;
});