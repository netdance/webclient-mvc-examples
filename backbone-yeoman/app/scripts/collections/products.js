/*global define*/

define([
    'underscore',
    'backbone',
    'models/product'
], function (_, Backbone, ProductModel) {
    'use strict';

    var ProductsCollection = Backbone.Collection.extend({
        model: ProductModel
    });

    return ProductsCollection;
});