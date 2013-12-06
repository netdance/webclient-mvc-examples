/*global define*/

define([
    'underscore',
    'backbone',
    'models/category'
], function (_, Backbone, CategoryModel) {
    'use strict';

    var CategoryCollection = Backbone.Collection.extend({
        model: CategoryModel,
        baseurl: '/categories.json?',
	    // default starting page if none specified is 1
	    page: 1,
	    url: function() {
	        return this.baseurl + $.param({
	            'page': this.page,
	            'q': this.search
	        });
	    },
	    initialize: function(options) {
	        console.log('initializing Categories collection');
	        _.bindAll(this, 'hasMore', 'hasLess', 'goMore', 'goLess', 'url', 'fetchAll');
	        if (options.page) {
	            this.page =  options.page;
	        }
	        if (options.search) {
	            this.search = options.search;
	        }
	    },
	    // overcome qedserver's reluctance to get all categories - despite the fact that we need that list
	    // to populate the list of categories for adding a product.  Recursively get all pages on the server until done.
	    // fires off a 'fetchedAll' event when complete.
	    // note that once we fetchAll, hasMore, hasLess, goMore and goLess are no longer relevant, since we have the whole
	    // list in memory
	    fetchAll: function() {
	        this.page = 1;
	        var collection = this;
	        this.fetch({
	            reset: false
	        }).done(function getAnother(data) {
	            if (data.length < 10) {
	                // done
	                collection.trigger('fetchedAll',collection);
	            } else {
	                collection.page++;
	                collection.fetch({
	                    remove: false
	                }).done(getAnother);
	            }
	        });
	    },
	    // paging function.  Note that this impl is bugged - if the server has exactly #categories % 10, then this will
	    // incorrectly return true.  But for our purposes, it's good enough.  In a real system, you'd be able to get an
	    // aggregate count anyway.
	    hasMore: function() {
	        return this.length === 10;
	    },
	    // paging function.
	    hasLess: function() {
	        return this.page > 1;
	    },
	    // paging function
	    goMore: function() {
	        if (this.hasMore()) {
	            this.page++;
	            this.fetch({reset: true});
	        }
	    },
	    // paging function
	    goLess: function() {
	        if (this.hasLess()) {
	            this.page--;
	            this.fetch({reset: true});
	        }
	    }
    });

    return CategoryCollection;
});