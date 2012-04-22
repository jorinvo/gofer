define(['src/helpers'], function(helpers) {

  describe('helpers()', function() {
    var myFunc = function() {};
    it('add functions to helpers', function(done) {
      helpers({ test: myFunc });
      done();
    });
    it('returns the right function', function(done) {
      helpers({ test: function() {} });
      helpers('test').should.equal(myFunc);
      done();
    });
    it('helpers.overwrite() overwrites existing functions', function(done) {
      helpers.overwrite({ test: function() {} });
      helpers('test').should.not.equal(myFunc);
      done();
    });
  });

});
