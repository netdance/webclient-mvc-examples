/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/landing'
], function ($, _, Backbone, JST, LandingView) {
    'use strict';

    var MainView = Backbone.View.extend({
        $child: null,
	    landing: null,  // special case for cached landing page
	    el: '#mainAnchorPoint',
	    initialize: function() {
	        console.log('initializing mainanchor');
	        _.bindAll(this, 'render', 'showLanding');
	    },
	    render: function(options) {
	        console.log('rendering main anchor');
	        if (options.$child) {
	            if (this.$child === this.landing) {
	                this.landing.$el.hide();
	            } else if (this.$child) {
	                this.$child.close();
	            }
	            this.$child = options.$child;
	            if (this.$child === this.landing) {
	                this.landing.$el.show();
	            } else {
	                this.$child.insert();
	            }
	        }
	        return this;
	    },
	    showLanding: function() {
	        if (!this.landing) {
	            this.landing = new LandingView({
	                $container: this.$el
	            });
	            this.landing.render();
	        }
	        this.render({
	            $child: this.landing
	        });
	    }
    });

    return MainView;
});