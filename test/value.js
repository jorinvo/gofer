define(function() {
  describe('.value(startValue)', function() {
    var test;

    beforeEach(function() {
      test = gofer.value('test it');
    });

    it('takes a start-value', function() {
      test().should.equal('test it');
    });

    it('updates the value', function() {
      test('update value');
      test().should.equal('update value');
    });

    it('returns the value', function() {
      test('update value').should.equal('update value');
    });

    describe('.modify(function)', function() {
      function first (val) { return val[0]; }
      function upper (val) { return val.toUpperCase(); }

      it('runs the value truth the modifiers', function() {
        test.modify(upper);
        test().should.equal('TEST IT');
      });
      it('accepts more than one modifier', function() {
        test.modify(first);
        test.modify(upper);
        test().should.equal('T');
      });
      it('removes modifiers', function() {
        test.modify(upper);
        test.modify(first);
        test.modify(upper);
        test().should.equal('t');
      })
    });

    describe('.subscribe(function)', function() {

      it('notifies subscribers', function(done) {
        test.subscribe(function() {
          done();
        });
        test('change it');
      });
      it('removes subscribers', function() {
        function setter (val) {
          val.should.equal('test it');
        }
        test.subscribe(setter);
        test();
        test.subscribe(setter);
        test('not matching value');
      });
      it('accepts more than one subscribers', function(done) {
        test.subscribe(function(val) { val.should.equal('new value'); });
        test.subscribe(function(val) { val.should.equal('new value'); });
        test('new value');
        done();
      });
    });

     describe('.update()', function() {

      it('adds numbers', function() {

        test(1);
        test.update(2)().should.equal(3);
      });
      it('adds strings', function() {
        test('a');
        test.update('bc')().should.equal('abc');
      });
      it('concatenates arrays', function() {
        test([1]);
        test.update([2, 3])().should.have.length(3);
      });
      it('appends to arrays', function() {
        test([1]);
        test.update(2)().should.have.length(2);
        test([1]);
        log(test.update(2, 3)());
        test().should.have.length(3);
      });
      it('extends objects', function() {
        test({a: 1});
        test.update({b: 2})().should.contain.keys(['a', 'b']);
      });
      it('adds properties to objects', function() {
        test({a: 1});
        test.update(['b', 2])().should.contain.keys(['a', 'b']);
        test({a: 1});
        test.update('b', 2)().should.contain.keys(['a', 'b']);
      });
    });

  });
});