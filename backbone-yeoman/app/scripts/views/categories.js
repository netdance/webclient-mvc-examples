/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CategoriesView = Backbone.View.extend({
        template: JST['app/scripts/templates/categories.ejs']
    });

    return CategoriesView;
});