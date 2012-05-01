define(['manage'], function(manage) {


  var cache = {};

  function hook(event, arg) {
    if ( _.isFunction(arg) ) {
      cache[event] = cache[event] ? manage( cache[event], arg ) : [arg];
      return hook;
    } else {
      var isOk = true;
      _.each(cache[event], function(subscriber) {
        subscriber(arg) || (isOk = false);
      });
      return isOk;
    }

  }

  return hook;
});