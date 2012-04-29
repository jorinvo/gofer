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
  var all = 'getTemplate helpers hook mode registerTags render settings slugs template value';
  var files = window.location.hash.slice(1) ?
    ['test/' + window.location.hash.slice(1)] :
    _.map(all.split(' '), function(el) {
    return 'test/' + el;
    });
  require(files, function() {
    mocha
      .run()
    });
});
