define(function() {
  describe('.hook(event[, callback])', function(){

    it('takes functions to subscribe to events', function() {
      gofer.hook('myEvent', function() {});
    });

    it('triggers events and notifies all observers', function(done) {
      gofer.hook('myEvent', function() {
        done();
      });
      gofer.hook('myEvent');
    });

  });
});