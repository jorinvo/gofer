define(['src/gofer', 'src/tags'], function(gofer) {
  describe('gofer', function(){


    it('is AMD compatible', function(done) {
      gofer.should.exist;
      done();
    });


    describe('init', function(){

      it('accepts an options-hash', function(done) {
        gofer({
          container: '#gofer-container',
          template: 'test/assets/file.gofer'
        });
        done();
      });

      it('adds content to the specified container', function(done) {
        gofer.hook('domReady', function() {
          $('#gofer-container').children().length.should.be.above(0);
          done();
        });
      });

    });


  });
});