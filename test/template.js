define([ "template" ], function(template) {
  describe("template", function() {
    it("caches single items", function() {
      template("test1", "name: <%= name %>");
    });
    it("returns render-functions of single items", function() {
      template("test1", "name: <%= name %>");
      template("test1");
    });
    it("renders single items", function() {
      template("test1", {
        name: "gofer"
      }).should.equal("name: gofer");
    });
    it("caches a hash of items", function() {
      template({
        test1: "name: <%= name %>",
        test2: "adress: <%= adress %>"
      });
      template("test2", {
        adress: "da hood"
      }).should.equal("adress: da hood");
    });
    it("renders a hash of items", function() {
      template({
        test1: "name: <%= name %>",
        test2: "adress: <%= adress %>"
      });
      var res = template({
        test1: { name: "gofer" },
        test2: { adress: "da hood" }
      });
      res.test1.should.equal("name: gofer");
      res.test2.should.equal("adress: da hood");
    });
    it("caches and renders a single item with one call", function() {
      template("test", "<%= word %>", { word: "cool" }).should.equal("cool");
      template("test", { word: "even better" }).should.equal("even better");
    });
    it("returns a list of all cached templates", function() {
      template({
        test: "word: <%= word %>",
        test1: "name: <%= name %>",
        test2: "adress: <%= adress %>"
      });
      template().should.have.length(3);
    });
  });
});