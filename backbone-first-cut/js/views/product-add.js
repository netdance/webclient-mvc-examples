App.Views.ProductAdd = Backbone.View.extend({
    template: _.template($('#template-product-add').html()),
    tagName: 'div',
    className: 'container',
    $container: null,
    events: {
        'click button': 'onAddClick'
    },
    initialize: function(options) {
        "use strict";
        console.log('initializing add product view');
        _.bindAll(this, 'render', 'insert', 'onAddClick', 'addSuccess', 'addError');

        this.$container = options.$container;
        this.collection = options.collection;
        this.categoryCollection = options.categoryCollection;
        this.render();
    },
    render: function() {
        "use strict";
        console.log('rendering add product ');
        var html = this.template();
        this.$el.html(html);

        return this;
    },
    insert: function() {
        "use strict";
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
        if (newModel.isValid()) {
            newModel.save(newModel.attributes,{
                success: this.addSuccess,
                error: this.addError
            });
        } else {
            App.alert.addAlert(newModel.validationError, 'error');
        }

    },
    addSuccess: function(){ // model, response, options
        "use strict";
        App.alert.addAlert('added category successfully','success');
        this.collection.fetch({reset: 'true'})
    },
    addError: function() {  // model, xhr, options
        "use strict";
        App.alert.addAlert('error saving category','error');
    }

});