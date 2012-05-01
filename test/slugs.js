define([], function() {
  describe(".slugs", function() {
    it("is a hash of slugs used for edit-mode rendering", function() {
      $.isPlainObject(gofer.slugs).should.be.true;
    });
    it("contains header and footer", function() {
      gofer.slugs.should.have.keys([ "header", "footer" ]);
    });
  });
});