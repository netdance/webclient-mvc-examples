App.Views.Landing = Backbone.View.extend({
    template: _.template($('#template-landing').html()),
    $container: null,
    attributes: {
        id: 'landingContainer',
        class: 'container'
    },
    initialize: function (options) {
        _.bindAll(this, 'render');
        console.log('initializing landing view');
        this.$container = options.$container;
    },
    render: function () {
        this.$el.html(this.template());
        // initialize Bootstrap popover
        this.$('[data-toggle=popover]').popover();
        this.$container.append(this.$el);
        return this;
    }
});
