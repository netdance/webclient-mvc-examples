/* global define, describe, it, before, after, Backbone */

define(function(require) {
    'use strict';

    var baseURL = window.location.pathname;
    var injector, Router;

    before(function() {
        require('backbone');

        // create mainanchor tag, for mainview which is initialized by router
        var $mainanchor = $('<div></div>').attr('id','mainAnchorPoint');
        $('#test-fixture').append($mainanchor);
        require(['Squire'], function(Squire) {
            injector = new Squire();
            injector.mock('views/main',{});
            Router = injector.require('Router');

        });

        // TODO - there's a problem integrating bootstrap with our testing.
        // it's failing on .popover()
        Backbone.history.start();
    });

    after(function() {
        // undocumented call, but seems intended for testing
        Backbone.history.stop();
        $('#test-fixture').empty();
    });

    describe('Router', function() {
        it('should exist', function() {
            //var router = Router;
        });
        it('should start in place', function() {
            baseURL.should.be.equal('/index.html');
        });
        it('should route /products correctly', function() {

        });
        it('should route /product/add correctly');
        it('should route /categories correctly');
    });
});