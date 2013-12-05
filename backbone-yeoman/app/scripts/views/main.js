/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var MainView = Backbone.View.extend({
        template: JST['app/scripts/templates/main.ejs']
    });

    return MainView;
});