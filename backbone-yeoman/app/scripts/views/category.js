/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/alert'
], function ($, _, Backbone, JST, alertView) {
    'use strict';

    var CategoryView = Backbone.View.extend({
        template: JST['app/scripts/templates/category.ejs'],
        $container: null,
        events: {
            'click .category-delete-button': 'deleteCategory'
        },
        initialize: function(options) {
            _.bindAll(this, 'render', 'insert', 'deleteCategory');

            this.$container = options.$container;
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.insert();
        },
        render: function() {
            var name = this.model.attributes || 'not set';
            console.log('rendering category ' + name);
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        insert: function() {
            this.$container.append(this.$el);
        },
        deleteCategory: function() {
            console.log('destroying category ' + this.model.get('id'));
            var name = this.model.get('name');
            var collection = this.model.collection;
            this.model.destroy({
                success: function() {
                    alertView.addAlert('successfully deleted category: ' + name, 'success');
                    collection.fetch({reset: true});
                },
                error: function() {
                    alertView.addAlert('error deleting category: ' + name, 'error');
                }
            });
        }

    });

    return CategoryView;
});