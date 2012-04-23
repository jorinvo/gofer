require.config( {
  paths: {
    text: 'libs/require/text',
    chai: 'libs/chai',
    mocha: 'libs/mocha'
  },
  baseUrl: '..'
} );

require(['chai', 'mocha', 'libs/log'], function(chai) {
  chai.should();
  window.expect = chai.expect;
  mocha.setup('bdd');
  var hash = window.location.hash.slice(1)

    , all = 'gofer value helpers lexer parser mode'

    , files = hash === 'all' ? _.map(all.split(' '), function(el) { return 'test/' + el; }) : ['test/'+hash];
  require(files, function() {
    mocha
      .run()
    });
});
