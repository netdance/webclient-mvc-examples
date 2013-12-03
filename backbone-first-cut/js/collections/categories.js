App.Collections.Categories = Backbone.Collection.extend({
    model: App.Models.Category,
    baseurl: '/categories.json?',
    page: 1,
    url: function() {
        "use strict";
        return this.baseurl + $.param({
            'page': this.page,
            'q': this.search
        });
    },
    initialize: function(options) {
        console.log('initializing Categories collection');
        _.bindAll(this, 'hasMore', 'hasLess', 'goMore', 'goLess', 'url', 'fetchAll');
        if (options.page) {
            this.page =  options.page;
        }
        if (options.search) {
            this.search = options.search;
            /*  todo remove me
             var sep = options.page ? '&' : '';
             this.baseurl = this.baseurl + sep + 'q=' + options.search;
             */
        }
    },
    fetchAll: function() {
        "use strict";
        this.page = 1;
        var collection = this;
        this.fetch({
            reset: false
        }).done(getAnother);
        function getAnother(data) {
            if (data.length < 10) {
                // done
                collection.trigger('fetchedAll',collection);
            } else {
                collection.page++;
                collection.fetch({
                    remove: false
                }).done(getAnother);
            }
        }
    },
    hasMore: function() {
        "use strict";
        return this.length === 10;
    },
    hasLess: function() {
        "use strict";
        return this.page > 1;
    },
    goMore: function() {
        "use strict";
        if (this.hasMore()) {
            this.page++;
            this.fetch({reset: true});
        }
    },
    goLess: function() {
        "use strict";
        if (this.hasLess()) {
            this.page--;
            this.fetch({reset: true});
        }
    }

});