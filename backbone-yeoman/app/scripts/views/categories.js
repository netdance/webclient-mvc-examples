/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/pager',
    'views/category',
    'views/alert'
], function ($, _, Backbone, JST, PagerView, CategoryView, AlertView) {
    'use strict';

    var CategoriesView = Backbone.View.extend({
        template: JST['app/scripts/templates/categories.ejs'],
        collection: null,
	    $container: null,
	    events: {
	        'click #addCategoryBtn': 'addCategoryForm',
	        'click #addCategoryInput button': 'addCategory'
	    },
	    attributes: {
	        class: 'container'
	    },
	    subViews: [],
	    initialize: function(options) {
	        _.bindAll(this, 'render', 'insert', 'addCategoryForm', 'addCategory', 'addSuccess', 'addError',
	            'refresh', 'close','destroySubviews');
	        console.log('initializing categories view');
	        this.collection = options.collection;
	        this.$container = options.$container;
	        this.listenTo(this.collection, 'reset', this.render);
	    },
	    refresh: function() {
	        this.collection.fetch({reset: true});
	    },
	    render: function() {
	        console.log('rendering categories');
	        this.destroySubviews();

	        this.$el.html(this.template());

	        var pagerView = new PagerView({
	            collection: this.collection,
	            $container: this.$el
	        });
	        pagerView.render();
	        this.subViews.push(pagerView);
	        var $container = this.$('#categoriesList').empty();
	        console.log('emptying container ' + $container.attr('id'));
	        var owningView = this;
	        this.collection.each(function(category) {
	            console.log('creating/rendering category ' + category.attributes.name);
	            var newCatRow = new CategoryView({
	                model: category,
	                $container: $container
	            });
	            newCatRow.render();
	            owningView.subViews.push(newCatRow);
	        });
	        return this;
	    },
	    insert: function() {
	        console.log('inserting categories');
	        this.$container.append(this.$el);
	        return this;
	    },
	    addCategoryForm: function() {
	        this.$('#addCategoryBtn').hide();
	        this.$('#newCategoryName').val('');
	        this.$('#addCategoryInput').show();
	    },
	    addCategory: function() {
	        var name = this.$('#newCategoryName').val();
	        var newModel = new this.collection.model({
	            'name': name
	        });

	        if (newModel.isValid()) {
	            this.$('#addCategoryBtn').show();
	            this.$('#addCategoryInput').hide();
	            newModel.save(newModel.attributes,{
	                success: this.addSuccess,
	                error: this.addError
	            });
	        } else {
	            AlertView.addAlert(newModel.validationError, 'error');
	        }
	    },
	    addSuccess: function addSuccess(){ // model, response, options
	        AlertView.addAlert('added category successfully','success');
	        this.collection.fetch({reset: 'true'});
	    },
	    addError: function addError() {  // model, xhr, options
	        AlertView.addAlert('error saving category','error');
	    },
	    destroySubviews: function destroySubviews() {
	        _.each(this.subViews, function(view) {
	            console.log('removing view '+view.cid);
	            view.remove();
	        });
	        this.subViews = [];
	    },
	    close: function close() {
	        this.destroySubviews();
	        this.remove();
	    }
    });

    return CategoriesView;
});