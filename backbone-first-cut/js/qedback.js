/*globals  $, _ , Backbone, alert, console */
/*jslint browser: true */

var App = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    alert: null,
    browser: null, // holder for main router
    navbar: null, // holder for NavigationBar instance
    mainAnchor: null // holder for landing page code
};

$(function () {
    'use strict';

    console.log('starting main program');

    App.navbar = new App.Views.NavigationBar();
    App.mainAnchor = new App.Views.MainAnchor();
    App.mainAnchor.showLanding();
    App.alert = new App.Views.Alert();
    App.browser = new App.Routers.Main();
    Backbone.history.start();
});
