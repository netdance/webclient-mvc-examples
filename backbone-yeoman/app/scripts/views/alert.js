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
        initialize: function initialize() {
            _.bindAll(this, 'addAlert');
            console.log('initializing alert view');
            this.listenTo(Backbone,'alert',this.addAlert);
        },
        addAlert: function(options) {
            var type, message;
            options = options || {};
            type = options.type || 'error';
            message = options.message || 'there was an application error';
            console.log('adding alert '+message + 'of type '+type);
            // note: may behave badly on limited cpu machines
            // a real impl would use CSS transitions, and probably a message queue, which would also solve
            // the problem of how to clean this all up after we display it (it's currently sticking 
            // around the DOM - ew)
            // see: http://stackoverflow.com/questions/7676356/can-twitter-bootstrap-alerts-fade-in-as-well-as-out
            // TODO implement in CSS transitions, add queuing
            var $alert = $(this.template({
                alertMessage: message,
                type: this.alertType[type]
            })).fadeIn(200).delay(3000).fadeOut(1000);
            this.$el.append($alert);
        }
    });
    
    return AlertView;
});