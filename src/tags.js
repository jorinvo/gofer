define(function() {

  var tags = {

    register: function(newTags) {
      tags.cache = _.defaults(tags.cache, newTags);
    },

    cache: {}
  };

  return tags;
});