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
    subViews: [],
    initialize: function(options) {
        "use strict";
        _.bindAll(this, 'render', 'insert', 'addCategoryForm', 'addCategory', 'addSuccess', 'addError',
            'refresh', 'close','destroySubviews');
        console.log('initializing categories view');
        this.collection = options.collection;
        this.$container = options.$container;
        this.listenTo(this.collection, 'reset', this.render);
    },
    refresh: function() {
        "use strict";
        this.collection.fetch({reset: true});
    },
    render: function() {
        "use strict";
        console.log('rendering categories');
        this.destroySubviews();

        this.$el.html(this.template());

         var pagerView = new App.Views.Pager({
            collection: this.collection,
            $container: this.$el
        });
        pagerView.render();
        this.subViews.push(pagerView);
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
            owningView.subViews.push(newCatRow);
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
    },
    destroySubviews: function() {
        _.each(this.subViews, function(view) {
            console.log('removing view '+view.cid);
            view.remove();
        });
        this.subViews = [];
    },
    close: function close() {
        this.destroySubviews();
        this.remove();
    }

});
