define([ "jquery", "value", "template", "hook", "tags" ], function($, value, template, hook, tags) {

  function Id(name) {

    this.data = value();

    Id.subscribe(name, _.bind(this.data, this));

    this.id = _.uniqueId("gofer");

    hook("dom", _.bind(function() {

      this.data.subscribe(_.bind(function() {
        $("." + this.id).html(this.content());
      }, this));

    }, this));

    template("id", '<div class="<%= id %>"><%= content() %></div>');
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

  Id.subscribe = function(name, cb) {

    Id.cache[name] ? cb(Id.cache[name]()) : Id.cache[name] = value([]);

    Id.cache[name].subscribe(cb);
  };

  Id.add = function(name, el) {

    Id.cache[name] || (Id.cache[name] = value([]));

    var position = Id.cache[name]().push(el.data()) - 1;

    el.data.subscribe(function(data) {
      Id.cache[name].update(position, data);
    });

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