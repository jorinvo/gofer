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
  require(['test/gofer', 'test/helpers', 'test/value'], function() {
    mocha
      .run()
    });
});
