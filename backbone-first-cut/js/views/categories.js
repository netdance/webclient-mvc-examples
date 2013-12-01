App.Views.Categories = Backbone.View.extend({
    collection: null,
    $container: null,
    events: {
        'click #addCategoryBtn': 'addCategoryForm',
        'click #addCategoryInput button': 'addCategory'
    },
    attributes: {
        class: 'container'
    },
    template: _.template($('#template-categories').html()),
    initialize: function(options) {
        "use strict";
        _.bindAll(this, 'render', 'insert', 'addCategoryForm', 'addCategory', 'addSuccess', 'addError', 'refresh');
        console.log('initializing categories view');
        this.collection = options.collection;
        this.$container = options.$container;
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'change', this.refresh);
    },
    refresh: function() {
        "use strict";
        this.collection.fetch({reset: true});
    },
    render: function() {
        "use strict";
        console.log('rendering categories');
        this.trigger('change');
        this.$el.html(this.template());
        var pagerView = new App.Views.Pager({
            collection: this.collection,
            $container: this.$el
        });
        pagerView.render();
        pagerView.listenTo(this, 'change', pagerView.remove);
        var $container = this.$('#categoriesList').empty();
        console.log('emptying container ' + $container.attr('id'));
        var owningView = this;
        this.collection.each(function(category) {
            console.log('creating/rendering category ' + category.attributes.name);
            var newCatRow = new App.Views.Category({
                model: category,
                $container: $container
            });
            newCatRow.render();
            newCatRow.listenTo(owningView,'change',newCatRow.remove);
        });
        return this;
    },
    insert: function() {
        "use strict";
        console.log('inserting categories');
        this.$container.append(this.$el);
        return this;
    },
    addCategoryForm: function() {
        "use strict";
        this.$('#addCategoryBtn').hide();
        this.$('#newCategoryName').val('');
        this.$('#addCategoryInput').show();
    },
    addCategory: function() {
        "use strict";
        var name = this.$('#newCategoryName').val();
        var newModel = new this.collection.model({
            'name': name
        });

        if (newModel.isValid()) {
            this.$('#addCategoryBtn').show();
            this.$('#addCategoryInput').hide();
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
