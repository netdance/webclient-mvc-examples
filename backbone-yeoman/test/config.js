require.config({
  baseUrl: '/scripts',
  paths: {
      jquery: '/bower_components/jquery/jquery',
      backbone: '/bower_components/backbone/backbone',
      underscore: '/bower_components/underscore/underscore',
      bootstrap: '/bower_components/sass-bootstrap/dist/js/bootstrap',
      CategoryModel: 'models/category',
      ProductModel: 'models/product',
      Alerts: 'views/alert',
      Router: 'routes/main'
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
    }
  }
});
