define(function() {
  describe('.id()', function(){

    it('creates unique ids for the use in the dom', function() {
      gofer.id().should.not.equal( gofer.id() );
      gofer.id().should.not.equal( gofer.id() );
      gofer.id().should.not.equal( gofer.id() );
    });

    it('matches /gofer\\d+/', function() {
      gofer.id().should.match(/gofer\d+/);
    });

    describe('.last()', function(){
      it('returns the last id', function() {
        gofer.id().should.equal( gofer.id.last() );
      });
    });

  });
});