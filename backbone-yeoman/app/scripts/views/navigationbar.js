/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'routes/main'
], function ($, _, Backbone,router) {
    'use strict';

    var NavigationbarView = Backbone.View.extend({
        events: {
            'click .navbar-brand': 'onBrandClick',
            'click #productNavLink': 'onProductClick',
            'click #categoryNavLink': 'onCategoryClick'
        },
        el: '#topnav',
        onBrandClick: function () {
            router.home();
        },
        onProductClick: function () {
            router.products();
        },
        onCategoryClick: function () {
            router.categories();
        }
    });
    return NavigationbarView;
});