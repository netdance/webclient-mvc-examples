/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AlertView = Backbone.View.extend({
        template: JST['app/scripts/templates/alert.ejs']
    });

    return AlertView;
});