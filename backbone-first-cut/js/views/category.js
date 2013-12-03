App.Views.Category = Backbone.View.extend({
    template: _.template($('#template-category').html()),
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
        "use strict";
        console.log('destroying category ' + this.model.get('id'));
        var name = this.model.get('name');
        var collection = this.model.collection;
        this.model.destroy({
            success: function() {
                App.alert.addAlert('successfully deleted category: ' + name, 'success');
                collection.fetch({reset: true});
            },
            error: function() {
                App.alert.addAlert('error deleting category: ' + name, 'error');
            }
        });
    }
});

