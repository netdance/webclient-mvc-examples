require.config({
  baseUrl: '/',
  paths: {
      jquery: '/bower_components/jquery/jquery',
      backbone: '/bower_components/backbone/backbone',
      underscore: '/bower_components/underscore/underscore',
      bootstrap: '/bower_components/sass-bootstrap/dist/js/bootstrap',
      //mocha: 'lib/mocha/mocha',
      chai: 'lib/chai',
      models: '/scripts/models/models'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'jquery': {
      exports: '$'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    mocha: {
         exports: 'mocha'
    },
    chai: {
         exports: 'chai'
    }
  }//,
  //urlArgs: 'bust=' + (new Date()).getTime()
});
