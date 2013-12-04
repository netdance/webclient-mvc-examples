/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ProductsView = Backbone.View.extend({
        template: JST['app/scripts/templates/products.ejs']
    });

    return ProductsView;
});