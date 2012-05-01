define([ "manage" ], function(manage) {

  function value(start) {
    var data = start
      , modifiers = []
      , subscribers = [];

    function getSet(val) {
      if( !_.isUndefined(val) ) {
        data = val;
        trigger();
      }
      return getData();
    }

    function getData() {
      return _.compose.apply(this, modifiers)(data);
    }

    function trigger() {
        var d = getData();
        _.each(subscribers, function(s) {
          s(d);
        });
    }

    _.extend(getSet, {
      modify: function(modifier) {
        modifiers = manage(modifiers, modifier);
        return this;
      },
      subscribe: function(subscriber) {
        subscribers = manage(subscribers, subscriber);
        return this;
      },
      trigger: function() {
        trigger();
        return this;
      },
      update: function(first) {
        var args = arguments;
        if ( _.isArray(data) ) {
          if (args.length === 2 && ( _.isNumber(args[0]) || _.isNumber(parseInt(args[0], 10)) ) ) {
            data[args[0]] = args[1];
          } else {
            data = data.concat( _.isArray(first) ? first : Array.prototype.slice.call(args) );
          }
        } else if ( _.isObject(data) ) {
          if ( !_.isUndefined(args[1]) ) data[ args[0] ] = args[1];
          else _.isArray(first) ? data[ first[0] ] = first[1] : _.extend(data, first);
        } else {
          data += first;
        }
        trigger();
        return this;
      }
    });

    return getSet;
  }

  return value;
});