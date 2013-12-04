/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var MainanchorView = Backbone.View.extend({
        template: JST['app/scripts/templates/mainAnchor.ejs']
    });

    return MainanchorView;
});