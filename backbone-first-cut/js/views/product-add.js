App.Views.ProductAdd = Backbone.View.extend({
    template: _.template($('#template-product-add').html()),
    tagName: 'div',
    className: 'container',
    $container: null,
    events: {
        'click button': 'onAddClick'
    },
    initialize: function(options) {
        _.bindAll(this, 'render', 'insert', 'onAddClick');

        this.$container = options.$container;

        this.listenTo(this.model, 'change', this.render);
        this.insert();
    },
    render: function() {
        var name = this.model.attributes || 'not set';
        console.log('rendering add product ');
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
    onAddClick: function() {
        "use strict";
        var name = this.$('#addProductName').val();
        var price = this.$('#addProductPrice').val();
        var description = this.$('#addProductDescription').val();

        var newModel = new this.collection.model({
            'name': name,
            'price': price,
            'description': description
        });

    }
});