/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var PagerView = Backbone.View.extend({
        template: JST['app/scripts/templates/pager.ejs']
    });

    return PagerView;
});