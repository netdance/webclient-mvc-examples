App.Collections.Products = Backbone.Collection.extend({
    model: App.Models.Product,
    baseurl: '/products.json?',
    page: 1,
    search: null,
    url: function() {
        "use strict";
        return this.baseurl + $.param({
            'page': this.page,
            'q': this.search
        });
    },
    initialize: function(options) {
        "use strict";
        console.log('initializing Products collection');
        _.bindAll(this, 'hasMore', 'hasLess', 'goMore', 'goLess', 'url');
        if (options.cat) {
            this.baseurl = '/categories/' + options.cat + '/products.json?';
        }
        if (options.page) {
            this.page = options.page;
        }
        if (options.search) {
            this.search = options.search;
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