App.Views.Products = Backbone.View.extend({
    collection: null,
    $container: null,
    template: _.template($('#template-products').html()),
    attributes: {
        class: 'container'
    },
    events: {
        'click #addProductBtn': 'addProduct'
    },
    initialize: function (options) {
        "use strict";
        _.bindAll(this, 'render','insert');
        console.log('initializing products view');
        this.collection = options.collection;
        this.$container = options.$container;
        this.listenTo(this.collection, 'reset', this.render);
    },
    render: function () {
        "use strict";
        console.log('rendering products');
        this.trigger('change');
        this.$el.html(this.template());
        var pagerView = new App.Views.Pager({
            collection: this.collection,
            $container: this.$el
        });
        pagerView.render();
        pagerView.listenTo(this,'change',pagerView.remove);
        var $container = this.$('#productsList').empty();
        console.log('emptying container ' + $container.attr('id'));
        this.collection.each(_.bind(function (product) {
            console.log('creating/rendering product ' + product.attributes.name);
            var newProdRow = new App.Views.Product({
                model: product,
                $container: $container
            });
            newProdRow.render();
            // newProdRow.listenTo(this,'change',newProdRow.remove);  //todo fixme
        }),this);
        return this;
    },
    insert: function() {
        "use strict";
        console.log('inserting products');
        this.$container.append(this.$el);
        return this;
    },
    addProduct: function() {
        console.log('adding product');
        App.browser.navigate('/products/add', {
            trigger: true
        });
    }
});
