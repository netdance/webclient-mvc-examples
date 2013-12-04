/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var NavsearchView = Backbone.View.extend({
        template: JST['app/scripts/templates/navsearch.ejs']
    });

    return NavsearchView;
});