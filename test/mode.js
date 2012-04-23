define(['src/gofer'], function(gofer) {
  describe('mode', function(){

    it('toggles the mode', function(done) {
      gofer.should.exist;
      expect(window.gofer).to.not.exist;
      done();
    });

  });
});