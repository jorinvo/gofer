define([ "jquery" ], function($) {

  function helpers(arg) {
    if (!$.isPlainObject(arg)) return cache[arg];
    _.defaults(cache, arg);
  }

  var cache = {};

  helpers.overwrite = function(hash) {
    _.extend(cache, hash);
  };

  return helpers;
});