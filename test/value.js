define([ "value" ], function(value) {
  describe(".value(startValue)", function() {
    var test;
    beforeEach(function() {
      test = value("test it");
    });
    it("takes a start-value", function() {
      test().should.equal("test it");
    });
    it("updates the value", function() {
      test("update value");
      test().should.equal("update value");
    });
    it("returns the the object", function() {
      test("update value")().should.equal("update value");
    });
    describe(".modify(function)", function() {
      function first(word) {
        return word[0];
      }
      function upper(word) {
        return word.toUpperCase();
      }
      it("runs the value truth the modifiers", function() {
        test.modify(upper);
        test().should.equal("TEST IT");
      });
      it("accepts more than one modifier", function() {
        test.modify(first);
        test.modify(upper);
        test().should.equal("T");
      });
      it("removes modifiers", function() {
        test.modify(upper);
        test.modify(first);
        test.modify(upper);
        test().should.equal("t");
      });
    });
    describe(".subscribe(function)", function() {
      it("notifies subscribers", function(done) {
        test.subscribe(function() {
          done();
        });
        test("change it");
      });
      it("removes subscribers", function() {
        function observer(word) {
          word.should.equal("test it");
        }
        test.subscribe(observer);
        test();
        test.subscribe(observer);
        test("not matching value");
      });
      it("accepts more than one subscribers", function(done) {
        test.subscribe(function(word) {
          word.should.equal("new value");
        });
        test.subscribe(function(word) {
          word.should.equal("new value");
          done();
        });
        test("new value");
      });
    });
    describe(".update()", function() {
      it("adds numbers", function() {
        test(1);
        test.update(2)().should.equal(3);
      });
      it("adds strings", function() {
        test("a");
        test.update("bc")().should.equal("abc");
      });
      it("concatenates arrays", function() {
        test([ 1 ]);
        test.update([ 2, 3 ])().should.have.length(3);
      });
      it("appends to arrays", function() {
        test([ 1 ]);
        test.update(2)().should.have.length(2);
        test([ 1 ]);
        test.update(2, 3, 4)().should.have.length(4);
      });
      it("updates array elements", function() {
        test([ 1, 2, 3 ]);
        test.update(1, 4)().should.have.length(3);
        test()[1].should.equal(4);
        test([ 1, 2, 3 ]);
        test.update("1", 4)().should.have.length(3);
        test()[1].should.equal(4);
      });
      it("extends objects", function() {
        test({ a: 1 });
        test.update({ b: 2 })().should.contain.keys([ "a", "b" ]);
      });
      it("adds properties to objects", function() {
        test({ a: 1 });
        test.update([ "b", 2 ])().should.contain.keys([ "a", "b" ]);
        test({ a: 1 });
        test.update("b", 2)().should.contain.keys([ "a", "b" ]);
      });
    });
  });
});