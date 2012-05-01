define([], function() {
  describe("tags", function() {
    var $container = $("#gofer-container")
      , cb
      ;
    afterEach(function() {
      gofer.hook("dom", cb);
    });
    it("{{note}}", function(done) {
      cb = function() {
        $container.html().should.be.string("<p>this is my note</p>");
        done();
      };
      gofer.hook("dom", cb);
      gofer({
        template: "assets/note.html",
        container: "#gofer-container"
      });
    });
    it("{{input}}", function(done) {
      cb = function() {
        $container.html().should.be.string(
          '<label class="gofer">my note</label><input type="text" value="" id="gofer0" class="gofer">'
        );
        done();
      };
      gofer.helpers({
        special: function(inner) {
          return "! " + inner + " !";
        }
      });
      gofer.hook("dom", cb);
      gofer({
        template: "assets/input.html",
        container: "#gofer-container"
      });
    });
    it("{{link}}", function(done) {
      cb = function() {
        $container.html().should.be.string("");
        done();
      };
      gofer.hook("dom", cb);
      gofer({
        template: "assets/link.html",
        container: "#gofer-container"
      });
    });
  });
});