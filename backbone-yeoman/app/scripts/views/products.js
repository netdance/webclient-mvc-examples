/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/pager',
    'views/product'
], function ($, _, Backbone, JST, PagerView, ProductView) {
    'use strict';

    var ProductsView = Backbone.View.extend({
        template: JST['app/scripts/templates/products.ejs'],
        collection: null,
	    $container: null,
	    productAnchorSelector: '#productList',
	    attributes: {
	        class: 'container'
	    },
	    events: {
	        'click #addProductBtn': 'addProduct'
	    },
	    subViews: [],
	    initialize: function initialize(options) {
	        _.bindAll(this, 'render','insert', 'close','destroySubviews');
	        console.log('initializing products view');
	        this.collection = options.collection;
	        this.$container = options.$container;
	        this.listenTo(this.collection, 'reset', this.render);
	    },
	    render: function render() {
	        console.log('rendering products');
	        this.destroySubviews();
	        this.$el.html(this.template);
	        var pagerView = new PagerView({
	            collection: this.collection,
	            $container: this.$el
	        });
	        pagerView.render();
	        this.subViews.push(pagerView);
	        var $container = this.$(this.productAnchorSelector);//.empty();
	        var productsView = this;
	        this.collection.each(function (product) {
	            console.log('creating/rendering product ' + product.attributes.name);
	            var newProdRow = new ProductView({
	                model: product,
	                $container: $container
	            });
	            newProdRow.render();
	            productsView.subViews.push(newProdRow);
	        });
	        return this;
	    },
	    insert: function insert() {
	        console.log('inserting products');
	        this.$container.append(this.$el);
	        return this;
	    },
	    addProduct: function addProduct() {
	        console.log('adding product');
	        Backbone.history.navigate('/products/add', {
	            trigger: true
	        });
	    },
	    destroySubviews: function destroySubviews() {
	        _.each(this.subViews, function(view) {
	            console.log('removing view '+view);
	            view.remove();
	        });
	        this.subViews = [];
	    },
	    close: function close() {
	        this.destroySubviews();
	        this.remove();
	    }
    });

    return ProductsView;
});