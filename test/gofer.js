describe('gofer', function(){
  it('is AMD compatible', function(done) {
    require(['src/gofer'], function(gofer) {
      expect(gofer).to.exist;
      expect(window.gofer).to.not.exist;
      done();
    });
  });
});