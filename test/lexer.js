define(['src/gofer', 'src/tags'], function(gofer) {
  describe('lexer', function() {

    it('supports closing-tags', function(done) {
      var test = gofer.lexer('<h1>blank html</h1>{{note}}a note{{/note}}');
      test.should.have.length(5);
      test[0].should.equal('<h1>blank html</h1>');
      test[1].temp.should.equal('note');
      test[1].object.should.be.instanceOf(gofer.tags.note);
      test[2].should.equal('a note');
      test[3].should.have.keys(['tagName', 'temp', 'isClosingTag']);
      test[3].isClosingTag.should.be.true;
      test[4].should.equal('');

      done();
    });

  });
});