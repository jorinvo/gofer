define([], function() {
  describe("{{img}}", function() {
      it("works", function() {
        gofer({
          template: "assets/img.html",
          container: "#gofer-container"
        });
      });
  });
});