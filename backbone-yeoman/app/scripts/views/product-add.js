/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/category-check',
    'views/alert'
], function ($, _, Backbone, JST, CategoryCheckView, AlertView) {
    'use strict';

    var ProductAddView = Backbone.View.extend({
        template: JST['app/scripts/templates/product-add.ejs'],
	    tagName: 'div',
	    className: 'container',
	    $container: null,
	    categoryAnchor: '#addProductCategories',
	    events: {
	        'click button': 'onAddClick'
	    },
	    initialize: function(options) {
	        console.log('initializing add product view');
	        _.bindAll(this, 'render', 'insert', 'addSuccess', 'addError', 'remove', 'categoryAdd','categoriesAdd','close');

	        this.$container = options.$container;
	        this.collection = options.collection;
	        this.categoryCollection = options.categoryCollection;
	        this.render();
	    },
	    render: function() {
	        console.log('rendering add product ');
	        var html = this.template();
	        this.$el.html(html);
	        //TODO only gets first page - need to get all pages
	        var $container = this.$(this.categoryAnchor).empty();
	        console.log('emptying container ' + $container.attr('id'));
	        this.listenTo(this.categoryCollection,'reset',this.categoriesAdd);
	        this.listenTo(this.categoryCollection,'fetchedAll',this.categoriesAdd);
	        return this;
	    },
	    remove: function() {
	        this.trigger('remove');
	        return Backbone.View.prototype.remove.call(this);
	    },
	    insert: function() {
	        this.$container.append(this.$el);
	    },
	    categoriesAdd: function(collection) {
	        console.log('creating/rendering all categories'+collection.toJSON());
	        this.categoryCollection.each(this.categoryAdd);
	    },
	    categoryAdd: function(model) {
	        var $container = this.$(this.categoryAnchor);
	        console.log('creating/rendering category ' + model.attributes.name);
	        var newCatRow = new CategoryCheckView({
	            model: model,
	            $container: $container
	        });
	        newCatRow.render();
	        newCatRow.listenTo(this,'remove',newCatRow.remove);
	    },
	    onAddClick: function() {
	        var name = this.$('#addProductName').val();
	        var price = this.$('#addProductPrice').val();
	        var description = this.$('#addProductDescription').val();

	        var catIds = [];
	        // todo the place this should go is in the subordinate view, but I'm feeling lazy
	        this.$('input:checked').each(function (index, element) {
	            catIds.push($(element).attr('data-var'));
	        });

	        var newModel = new this.collection.model({
	            'name': name,
	            'price': price,
	            'description': description,
	            'category_ids': catIds
	        });
	        if (newModel.isValid()) {
	            newModel.save(newModel.attributes,{
	                success: this.addSuccess,
	                error: this.addError
	            });
	        } else {
	            AlertView.addAlert(newModel.validationError, 'error');
	        }

	    },
	    addSuccess: function(){ // model, response, options
	        AlertView.addAlert('added product successfully','success');
	        Backbone.history.navigate('/products', {
	            trigger: true
	        });
	    },
	    addError: function() {  // model, xhr, options
	        AlertView.addAlert('error saving product','error');
	    },
	    close: function() {
	        this.remove();
	    }
    });

    return ProductAddView;
});