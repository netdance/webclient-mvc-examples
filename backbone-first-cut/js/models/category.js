App.Models.Category = Backbone.Model.extend({
    defaults: {
        name: ''
    },
    urlForCreate: '/categories.json',
    urlPrefixForAllElse: '/categories/',
    urlPostfixForAllElse: '.json',
    validate: function(attrs) {
        if (!attrs || !attrs.name) {
            return 'need a category name';
        }
        return false;
    },
    initialize: function(attributes) {
        var name = attributes.name || '<NOT SET>';
        console.log('Initializing a new Category model for ' + name);
        _.bindAll(this,'sync');
    },
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