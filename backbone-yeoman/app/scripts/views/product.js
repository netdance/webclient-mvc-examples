/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ProductView = Backbone.View.extend({
        template: JST['app/scripts/templates/product.ejs'],
        $container: null,
        tagName: 'div',
        className: '',
        events: {
            'click .product-delete-button': 'deleteProduct'
        },
        initialize: function(options) {
            _.bindAll(this, 'render', 'insert');

            this.$container = options.$container;

            this.listenTo(this.model, 'change', this.render);
            this.insert();
        },
        render: function() {
        	this.$el.empty();
            this.$el.html(this.template({
                name: this.model.get('name'),
                price: Number(this.model.get('price')).toFixed(2),
                description: this.model.get('description')
            }));

            return this;
        },
        insert: function() {
            this.$container.append(this.$el);
        },
        deleteProduct: function() {
            console.log('destroying product ' + this.model.get('id'));
            var name = this.model.get('name');
            var collection = this.model.collection;
            this.model.destroy({
                success: function() {
                    Backbone.trigger('alert',{
                        message: 'successfully deleted product: ' + name,
                        type: 'success'
                    });
                    collection.fetch({reset: true});
                },
                error: function() {
                    Backbone.trigger('alert',{
                        message: 'error deleting product: ' + name,
                        type: 'error'
                    });
                }
            });
        }
    });

    return ProductView;
});