define(['src/gofer'], function(gofer) {

describe('helpers', function() {
      var myFunc = function() {};
      it('add functions to helpers', function(done) {
        gofer.helpers({ test: myFunc });
        done();
      });
      it('returns the right function', function(done) {
        gofer.helpers({ test: function() {} });
        gofer.helpers('test').should.equal(myFunc);
        done();
      });
      it('helpers.overwrite() overwrites existing functions', function(done) {
        gofer.helpers.overwrite({ test: function() {} });
        gofer.helpers('test').should.not.equal(myFunc);
        done();
      });
    });

});