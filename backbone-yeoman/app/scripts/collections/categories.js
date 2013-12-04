/*global define*/

define([
    'underscore',
    'backbone',
    'models/category'
], function (_, Backbone, CategoryModel) {
    'use strict';

    var CategoriesCollection = Backbone.Collection.extend({
        model: CategoryModel
    });

    return CategoriesCollection;
});