/*global define*/

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var NavigationbarView = Backbone.View.extend({
        events: {
            'click .navbar-brand': 'onBrandClick',
            'click #productNavLink': 'onProductClick',
            'click #categoryNavLink': 'onCategoryClick'
        },
        el: '#topnav',
        onBrandClick: function () {
            Backbone.history.navigate('/home', {
                trigger: true
            });
        },
        onProductClick: function () {
            Backbone.history.navigate('/products', {
                trigger: true
            });
        },
        onCategoryClick: function () {
            Backbone.history.navigate('/categories', {
                trigger: true
            });
        }
    });

    return NavigationbarView;
});