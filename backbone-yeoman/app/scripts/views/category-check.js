/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CategoryCheckView = Backbone.View.extend({
        template: JST['app/scripts/templates/category-check.ejs']
    });

    return CategoryCheckView;
});