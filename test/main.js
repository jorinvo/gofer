require(["../libs/chai", "../libs/mocha", "../libs/log", '../libs/underscore'], function(chai) {
  chai.should();
  window.expect = chai.expect;
  mocha.setup({
    ui: "bdd",
    globals: ["$", "jQuery", "gofer"]
  });
  var all = "getTemplate helpers hook mode registerTags render settings slugs template value"
    , files = window.location.hash.slice(1) ?
    ["../test/" + window.location.hash.slice(1)] :
    _.map(all.split(" "), function(el) {
      return "../test/" + el;
    });
  require(files, function() {
    mocha.run();
  });
});