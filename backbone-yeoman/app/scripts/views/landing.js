/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var LandingView = Backbone.View.extend({
        template: JST['app/scripts/templates/landing.ejs']
    });

    return LandingView;
});