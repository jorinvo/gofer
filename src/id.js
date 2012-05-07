define(["value", "template", "hook", "tags"], function(value, template, hook, tags) {

  function Id(name) {

    this.data = value();

    Id.subscribe(name, _.bind(this.data, this));

    this.id = _.uniqueId("gofer");

    hook("dom", _.bind(function() {

      var $el = $("." + this.id).html(this.content());

      this.data.subscribe(_.bind(function() {
        $("." + this.id).html(this.content());
      }, this));

    }, this));

    template("id", '<div class="<%= id %>"></div>');
  }

  _.extend(Id.prototype, {

    edit: function(content) {

      if (content) {
        this.content = function() {
          return _.reduce(this.data(), function(memo, el) {
            return memo + content().replace(/\{\{el\}\}/, el);
          }, "");
        } ;
      } else {
        this.content = function() {
          return _.reduce(this.data(), function(memo, el) {
            return memo + el;
          }, "");
        };
      }

      return template("id", this);
    },

    view: function(content) {
      return this.content();
    }

  });

  Id.cache = {};

  var createCache = function(name) {

    Id.cache[name] = {

      data: function() {
        return _.map(this.objects, function(object) {
          return object();
        }, this);
      },
      objects: [],
      observers: []

    };
  };


  Id.subscribe = function(name, cb) {

    Id.cache[name] ? cb(Id.cache[name].data()) : createCache(name);

    Id.cache[name].observers.push(cb);

  };


  Id.trigger = function(name, position) {
    var data = Id.cache[name].data();
    _.each(Id.cache[name].observers, function(observer) {
      observer(data, position);
    });
  };


  Id.add = function(name, el) {

    Id.cache[name] || createCache(name);

    var position = Id.cache[name].objects.push(el) - 1;

    el.subscribe(function(data) {
      Id.trigger(name, position);
    });

    Id.trigger(name, position);
  };


  Id.update = function(name, position, value) {
    Id.cache[name].objects[position](value);
    Id.trigger(name, position);
  };



  function El() {}

  _.extend(El.prototype, {

    edit: function() {
      return "{{el}}";
    },

    view: function() {
      return "{{el}}";
    }

  });

  tags.register({
    el: El
  });


  return Id;
});