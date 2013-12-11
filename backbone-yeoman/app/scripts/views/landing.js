/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var LandingView = Backbone.View.extend({
        template: JST['app/scripts/templates/landing.ejs'],
        $container: null,
	    attributes: {
	        id: 'landingContainer',
	        class: 'container'
	    },
	    initialize: function (options) {
	        _.bindAll(this, 'render');
	        console.log('initializing landing view');
	        this.$container = options.$container;
	    },
	    render: function () {
	        this.$el.html(this.template());
	        // initialize Bootstrap popover
            // for now, put in a try/catch since testing is having problems with bootstrap js
            try {
                this.$('[data-toggle=popover]').popover();
            } catch (e) {
                console.log(e.message);
            }
	        this.$container.append(this.$el);
	        return this;
	    }

    });

    return LandingView;
});