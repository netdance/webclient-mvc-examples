/* global define, describe, it */

define(function(require) {
    'use strict';

    var baseURL = window.location.pathname;

    before(function() {
        require('backbone');
        //var Router = require('Router');  // this will work, I think, once we change the views it loads on startup.
        Backbone.history.start();
    });

    describe('Router', function() {
        it('should start in place', function() {
            baseURL.should.be.equal('/index.html');
        });
        it('should route /products correctly');
        it('should route /product/add correctly');
        it('should route /categories correctly');
    });
});