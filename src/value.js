define([], function() {

  var factory = function(start) {
    var data = start || null
      , modifiers = []
      , subscribers = [];

    var value = function(val) {
      if (val) {
        _.each(modifiers, function(m) {
          val = m(val);
        });
        data = val;
        _.each(subscribers, function(s) {
          s(data);
        });
      }
      return data;
    };

    var manage = function(member, club) {
      var removed = _.reject(club, function(m) {
        return m === member;
      });
      if ( removed.length === club.length ) {
        club.push(member);
      } else {
        club = removed;
      }
      return club;
    };

    _.extend(value, {
      modify: function(modifier) {
        modifiers = manage(modifier, modifiers);
      },
      subscribe: function(subscriber) {
        subscribers = manage(subscriber, subscribers);
      }
    });

    return value;
  };

  return factory;

});