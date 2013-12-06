/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var PagerView = Backbone.View.extend({
        template: JST['app/scripts/templates/pager.ejs'],
        collection: null,
        $container: null,
        events: {
            'click a.previousPageLink': 'pageBack',
            'click a.nextPageLink': 'pageForward'
        },
        attributes: {
            class: 'row'
        },
        initialize: function (options) {
            _.bindAll(this, 'render', 'pageForward', 'pageBack');
            console.log('initializing pager view');
            this.$container = options.$container;
        },
        render: function() {
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
            console.log('pageForward');
            this.collection.goMore();
        },
        pageBack: function() {
            console.log('pageBack');
            this.collection.goLess();
        }

    });

    return PagerView;
});