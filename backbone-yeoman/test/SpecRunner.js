
/*
require(['require', 'chai', 'mocha', 'jquery'], function(require, chai){

  // Chai
  var should = chai.should();

  mocha.setup('bdd');

  require([
    'spec/test-models.js',
  ], function(require) {

    // Required to run via mocha-phantomjs from commandline
    if (window.mochaPhantomJS) { 
      mochaPhantomJS.run(); 
    }
    else { 
      mocha.run(); 
    }
  });

});
*/

mocha.setup({
    ui: 'bdd',
    ignoreLeaks: true
});
var should = chai.should();

// Protect from barfs
console = window.console || function() {};
 
// Don't track
//window.notrack = true;

function runMocha() {

    // Required to run via mocha-phantomjs from commandline
    if (window.mochaPhantomJS) { 
      mochaPhantomJS.run(); 
    }
    else { 
      mocha.run(); 
    }
}
