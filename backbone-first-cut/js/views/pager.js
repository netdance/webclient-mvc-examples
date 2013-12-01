App.Views.Pager = Backbone.View.extend({
    collection: null,
    $container: null,
    events: {
        'click a.previousPageLink': 'pageBack',
        'click a.nextPageLink': 'pageForward'
    },
    template: _.template($('#template-pager').html()),
    initialize: function (options) {
        "use strict";
        _.bindAll(this, 'render', 'pageForward', 'pageBack');
        console.log('initializing pager view');
        this.$container = options.$container;
    },
    render: function() {
        "use strict";
        this.$el.html(this.template());
        this.$container.prepend(this.$el);
        if (this.collection.hasLess()) {
            this.$('li.previousPage').removeClass('disabled');
        } else {
            this.$('li.previousPage').addClass('disabled');
        }
        if (this.collection.hasMore()) {
            this.$('li.nextPage').removeClass('disabled');
        } else {
            this.$('li.nextPage').addClass('disabled');
        }
    },
    pageForward: function() {
        "use strict";
        console.log('pageForward');
        this.collection.goMore();
    },
    pageBack: function() {
        "use strict";
        console.log('pageBack');
        this.collection.goLess();
    }
});

