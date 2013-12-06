/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AlertView = Backbone.View.extend({
        template: JST['app/scripts/templates/alert.ejs'],
	    alerts: [],
	    alertType: {
	        'success': 'alert-success',
	        'error': 'alert-danger'
	    },
	    el: '#alertAnchorPoint',
	    initialize: function() {
	        _.bindAll(this, 'addAlert');
	        console.log('initializing alert view');
	    },
	    addAlert: function(message, type) {
	        console.log('adding alert '+message);
	        // note: may behave badly on limited cpu machines
	        // a real impl would use CSS transitions, and probably a message queue, which would also solve
	        // the problem of how to clean this all up after we display it (it's currently sticking around the DOM
	        // see: http://stackoverflow.com/questions/7676356/can-twitter-bootstrap-alerts-fade-in-as-well-as-out
	        // todo implement in CSS transitions
	        var $alert = $(this.template({
	            alertMessage: message,
	            type: this.alertType[type]
	        })).fadeIn(200).delay(3000).fadeOut(1000);
	        this.$el.append($alert);
	    }
    });
	
    return new AlertView();
});