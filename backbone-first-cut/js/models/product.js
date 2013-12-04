App.Models.Product = Backbone.Model.extend({
    defaults: {
        name: '',
        price: 0,
        description: '',
        categories: []
    },
    urlForCreate: '/products.json',
    urlPrefixForAllElse: '/products/',
    urlPostfixForAllElse: '.json',
    validate: function(attrs) {
        if (!attrs.name) {
            return 'need a category name';
        }
        if (!attrs.description) {
            return 'need a description';
        }
        if (!$.isNumeric(attrs.price) || attrs.price === '') {
            return 'price must be a number';
        }
        if (attrs.price < 0) {
            return 'price must be >= 0';
        }
        return false;
    },
    initialize: function(attributes) {
        var name = attributes.name || '<NOT SET>';
        console.log('Initializing a new Product model for ' + name);
        _.bindAll(this,'sync');
    },
    /*
     Default handler:
     create → POST   /products
     read → GET   /products[/id]
     update → PUT   /products/id
     delete → DELETE   /products/id

     This handler:
     create → POST   /products.json
     read → GET   /products/id.json
     update → PUT   /products/id.json
     delete → DELETE   /products/id.json

     Collection reads happen via Products Collection
     */
    sync: function(method, model, options) {
        // override standard backbone url scheme to use
        // '/categories.json' for create and
        // '/categories/<id>.json for all else

        options = options || {};
        if (method.toLowerCase() === 'create') {
            options.url = this.urlForCreate;
        } else {
            options.url = this.urlPrefixForAllElse +
                model.attributes.id +
                this.urlPostfixForAllElse;
        }
        return Backbone.sync.apply(this, arguments);
    }
});