App.Views.Products = Backbone.View.extend({
    collection: null,
    $container: null,
    productAnchorSelector: '#productList',
    template: $('#template-products').html(),
    attributes: {
        class: 'container'
    },
    events: {
        'click #addProductBtn': 'addProduct'
    },
    subViews: [],
    initialize: function (options) {
        "use strict";
        _.bindAll(this, 'render','insert', 'close','destroySubviews');
        console.log('initializing products view');
        this.collection = options.collection;
        this.$container = options.$container;
        this.listenTo(this.collection, 'reset', this.render);
    },
    render: function () {
        "use strict";
        console.log('rendering products');
        this.destroySubviews();
        this.$el.html(this.template);
         var pagerView = new App.Views.Pager({
            collection: this.collection,
            $container: this.$el
        });
        pagerView.render();
        this.subViews.push(pagerView);
        var $container = this.$(this.productAnchorSelector);//.empty();
        var productsView = this;
        this.collection.each(function (product) {
            console.log('creating/rendering product ' + product.attributes.name);
            var newProdRow = new App.Views.Product({
                model: product,
                $container: $container
            });
            newProdRow.render();
            productsView.subViews.push(newProdRow);
        });
        return this;
    },
    insert: function insert() {
        "use strict";
        console.log('inserting products');
        this.$container.append(this.$el);
        return this;
    },
    addProduct: function addProduct() {
        console.log('adding product');
        App.browser.navigate('/products/add', {
            trigger: true
        });
    },
    destroySubviews: function() {
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
