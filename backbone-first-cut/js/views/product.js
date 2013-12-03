App.Views.Product = Backbone.View.extend({
    template: _.template($('#template-product').html()),
    $container: null,
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
        this.$el.addClass('row');
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
        "use strict";
        console.log('destroying product ' + this.model.get('id'));
        var name = this.model.get('name');
        var collection = this.model.collection;
        this.model.destroy({
            success: function() {
                App.alert.addAlert('successfully deleted product: ' + name, 'success');
                collection.fetch({reset: true});
            },
            error: function() {
                App.alert.addAlert('error deleting product: ' + name, 'error');
            }
        });
    }
});

