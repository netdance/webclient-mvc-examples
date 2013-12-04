/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var NavigationbarView = Backbone.View.extend({
        template: JST['app/scripts/templates/navigationbar.ejs']
    });

    return NavigationbarView;
});