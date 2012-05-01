define([], function() {
  describe(".settings()", function() {
    it("returns settingsHash", function() {
      gofer.settings().should.have.keys([
        "container",
        "dataUrl",
        "mode",
        "postUrl",
        "template",
        "updateTemplateUrl"
      ]);
    });
  });
});