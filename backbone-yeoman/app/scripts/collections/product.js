/*global define*/

define([
    'underscore',
    'backbone',
    'models/product'
], function (_, Backbone, ProductModel) {
    'use strict';

    var ProductCollection = Backbone.Collection.extend({
        model: ProductModel
    });

    return ProductCollection;
});