App.Views.CategoryCheck = Backbone.View.extend({
    template: _.template($('#template-category-check').html()),
    $container: null,
    initialize: function(options) {
        "use strict";
        console.log('initializing add product view');
        _.bindAll(this, 'render', 'insert');

        this.$container = options.$container;
        this.model = options.model;
        this.insert();
    },
    render: function() {
        "use strict";
        console.log('rendering add product ');
        var html = this.template(this.model.attributes);
        this.$el.html(html);
        return this;
    },
    insert: function() {
        "use strict";
        this.$container.append(this.$el);
    }
});