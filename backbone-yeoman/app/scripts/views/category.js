/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CategoryView = Backbone.View.extend({
        template: JST['app/scripts/templates/category.ejs']
    });

    return CategoryView;
});