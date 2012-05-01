define(["helpers"], function(helpers) {
  describe("helpers(functionsHash || functionName)", function() {
    var myFunc = function() {}, myOtherFunc = function() {};
    it("accepts a hash of functions", function() {
      helpers({
        test: myFunc,
        test2: myOtherFunc
      });
    });
    it("returns the right function", function() {
      helpers("test2").should.equal(myOtherFunc);
      helpers("test").should.equal(myFunc);
    });
    it("doesn't overwrite functions", function() {
      helpers({
        test: function() {}
      });
      helpers("test").should.equal(myFunc);
    });
    describe(".overwrite(functionsHash)", function() {
      it("can overwrite existing functions", function() {
        helpers.overwrite({
          test: myOtherFunc
        });
        helpers("test").should.equal(myOtherFunc);
      });
    });
  });
});