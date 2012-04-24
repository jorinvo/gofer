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

  require(['test/' + window.location.hash.slice(1)], function() {
    mocha
      .run()
    });
});
