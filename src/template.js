define([ "jquery" ], function($) {

  var cache = {};

  function template() {
    var args = arguments;

    if ( _.isUndefined(args[0]) ) return _.keys(cache);

    if ( $.isPlainObject(args[0]) ) {
      var hash = args[0];

      if ( _.isString( _.values(hash)[0] ) ) {

        _.each(hash, function(val, key) {
          hash[key] = _.template(val);
        });

        _.extend( cache, hash );

        return;
      } else {

        _.each(hash, function(val, key) {
          hash[key] = cache[key](val);
        });

        return hash;
      }
    }

    if ( _.isObject(args[1]) ) return cache[ args[0] ]( args[1] );

    if ( _.isUndefined(args[1]) ) return cache[ args[0] ];

    cache[ args[0] ] = _.template( args[1] );

    if (args[2]) return cache[ args[0] ]( args[2] );
  }

  return template;
});