/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ProductAddView = Backbone.View.extend({
        template: JST['app/scripts/templates/product-add.ejs']
    });

    return ProductAddView;
});