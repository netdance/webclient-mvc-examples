/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CategoryCheckView = Backbone.View.extend({
        template: JST['app/scripts/templates/category-check.ejs'],
        $container: null,
	    initialize: function(options) {
	        console.log('initializing add product view');
	        _.bindAll(this, 'render', 'insert');

	        this.$container = options.$container;
	        this.model = options.model;
	        this.insert();
	    },
	    render: function() {
	        console.log('rendering add product ');
	        var html = this.template(this.model.attributes);
	        this.$el.html(html);
	        return this;
	    },
	    insert: function() {
	        this.$container.append(this.$el);
	    }
    });

    return CategoryCheckView;
});