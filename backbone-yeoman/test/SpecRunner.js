
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
