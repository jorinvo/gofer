define(function() {
  describe('.helpers(functionsHash || functionName)', function() {
    var myFunc = function() {};
    var myOtherFunc = function() {};

    it('accepts a hash of functions', function() {
      gofer.helpers({
        test: myFunc,
        test2: myOtherFunc
      });
    });
    it('returns the right function', function() {
      gofer.helpers('test2').should.equal(myOtherFunc);
      gofer.helpers('test').should.equal(myFunc);
    });
    it("doesn't overwrite functions", function() {
      gofer.helpers({ test: function() {} });
      gofer.helpers('test').should.equal(myFunc);
    });
    describe('.overwrite(functionsHash)', function() {
      it('can overwrite existing functions', function() {
        gofer.helpers.overwrite({ test: myOtherFunc });
        gofer.helpers('test').should.equal(myOtherFunc);
      });
    })
  });
});