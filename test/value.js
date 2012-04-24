define(function() {
  describe('value', function() {
    var test = gofer.value('test it');

    it('takes a start-value', function(done) {
      test().should.equal('test it');
      done();
    })

    it('updates the value', function(done) {
      test('test me too').should.equal('test me too');
      done();
    });

    describe('modify', function() {
      function first (val) { return val[0]; }
      function upper (val) { return val.toUpperCase(); }
      it('runs the value truth the modifiers', function(done) {
        test.modify(upper);
        test('to upper').should.equal('TO UPPER');
        done();
      });
      it('accepts more than one modifier', function(done) {
        test.modify(first);
        test('first').should.equal('F');
        done();
      });
      it('removes modifiers', function(done) {
        test.modify(upper);
        test('first').should.equal('f');
        done();
      })
    });

    describe('subscribe', function() {
      function setter (val) { testField = val; }
      var testField;
      it('notifies subscribers', function(done) {
        test.subscribe(setter);
        var testVal = test('na');
        testField.should.equal(testVal);
        done();
      });
      it('removes subscribers', function(done) {
        test.subscribe(setter);
        test('ya');
        testField.should.equal('n');
        done();
      });
      it('accepts more than one subscribers', function(done) {
        test.subscribe(function(val) { val.should.equal('v') });
        test('val');
        done();
      });
    });

  });
});