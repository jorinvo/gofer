define([], function() {

  var cache = {};

  var helpers = function(args) {
      if ( $.isPlainObject(args) ) {
        _.defaults(cache, args);
      } else {
        return cache[args];
      }
  };

  helpers.overwrite = function(args) {
    _.extend(cache, args);
  };

  return helpers;

});