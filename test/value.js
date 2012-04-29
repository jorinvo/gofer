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
        test.subscribe(function(val) { val.should.equal('new value') });
        test.subscribe(function(val) { val.should.equal('new value') });
        test('new value');
        done();
      });
    });

  });
});