define(["hook"], function(hook) {
  describe("hook(event[, callback])", function() {
    it("takes functions to subscribe to events", function() {
      hook("myEvent", function() {});
    });
    it("triggers events and notifies all observers", function(done) {
      hook("myEvent", function() {
        done();
      });
      hook("myEvent");
    });
  });
});