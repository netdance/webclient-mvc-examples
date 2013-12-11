/* global define, describe, it, before, Backbone */

define(function(require) {
    'use strict';

    var baseURL = window.location.pathname;

    before(function() {
        require('backbone');

        // create mainanchor tag, for mainview which is initialized by router
        var $mainanchor = $('<div></div>').attr('id','mainAnchorPoint');
        $('#test-fixture').append($mainanchor);

        var Router = require('Router');  

        // TODO - there's a problem integrating bootstrap with our testing.
        // it's failing on .popover()
        //Backbone.history.start();
    });

    after(function() {
        // undocumented call, but seems intended for testing
        Backbone.history.stop();
        var Router = require('Router');  
        Router.mainView.remove(); //todo clean up child views
        $('#test-fixture').empty();
    })

    describe('Router', function() {
        it('should start in place', function() {
            baseURL.should.be.equal('/index.html');
        });
        it('should route /products correctly');
        it('should route /product/add correctly');
        it('should route /categories correctly');
    });
});