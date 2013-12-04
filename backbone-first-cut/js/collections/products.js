/*
 Collection for accessing backend products for qedserver.
 qedserver only allows paged access to lists of products.
 */
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
    // paging function.  Note that this impl is bugged - if the server has exactly #categories % 10, then this will
    // incorrectly return true.  But for our purposes, it's good enough.  In a real system, you'd be able to get an
    // aggregate count anyway.
    hasMore: function() {
        "use strict";
        return this.length === 10;
    },
    // paging function.
    hasLess: function() {
        "use strict";
        return this.page > 1;
    },
    // paging function.
    goMore: function() {
        "use strict";
        if (this.hasMore()) {
            this.page++;
            this.fetch({reset: true});
        }
    },
    // paging function.
    goLess: function() {
        "use strict";
        if (this.hasLess()) {
            this.page--;
            this.fetch({reset: true});
        }
    }
});