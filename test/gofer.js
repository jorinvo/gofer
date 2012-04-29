define(function() {
  describe('gofer', function(){


    it('is exposes a global window.gofer', function() {
      window.gofer.should.exist;
    });


    describe('init', function(){

      it('accepts an options-hash', function() {
        gofer({
          container: '#gofer-container',
          template: 'assets/file.html'
        });
      });

      it('adds content to the specified container', function() {
        $('#gofer-container').children().length.should.be.above(0);
      });

    });


  });
});