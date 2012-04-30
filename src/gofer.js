(function(window, $, _, undefined) {



  function gofer(args) {

    if ( typeof args === 'string' ) {
      console.log('implement find by #ID here...');
    } else if( $.isPlainObject(args) ) {
      settings = _.defaults( args, gofer.settings() );
      init();
    } else if ( !args ) {
      init();
    } else {
      throw new Error('invalid arguments');
    }

  }



  var settings = {
    template: './index.gofer',
    dataUrl: '/goferData',
    postUrl: '/',
    updateTemplateUrl: false,
    container: 'body',
    mode: 'edit'
  };

  gofer.settings = function() {
    return settings;
  };



  function init() {
    $.get(gofer.settings().template, function(template) {
      lexerTree = lexer(template);

      gofer.hook('dom', function() {
        $('#gofer-submit').click(function(e) {
          gofer.mode();
        });
      });

      gofer.render();
    });
  }



  gofer.render = function() {
    var mode = gofer.settings().mode;

    $(gofer.settings().container).html(

      ( mode === 'edit' ? gofer.slugs.header() : '' ) +
      parser( lexerTree.slice(), mode ) +
      ( mode === 'edit' ? gofer.slugs.footer() : '' )

    ).promise().done(function() {
      gofer.hook('dom');
    });
  };



  gofer.mode = function(mode) {
    if ( mode && !(mode in ['edit', 'view']) ) {
      console.log("Invalid mode.\nValid modes: 'edit', 'view'");
      return;
    }
    settings.mode = ( gofer.settings().mode === 'edit' ? 'view' : 'edit' );
    gofer.render();
  };



  gofer.generateOutput = function() {
    var output = $('html').clone();
    output.find(gofer.settings().container).html( parser(lexerTree.slice(), 'view') );
    return output.html().replace(/<!--\s*?gofer\s*?-->[\s\S]*?(<!--\s*?\/\s*?gofer\s*?-->)/, '');
  };



  var tags = {};

  gofer.registerTags = function(newTags) {
    _.each(newTags, function(v, k) {
      if ( !_.has(tags, k) ) {
        tags[k] = v;
      }
    });
  };



  function manage(club, member) {

    var removed = _.reject(club, function(m) {
      return m === member;
    });
    if ( removed.length === club.length ) {
      club.push(member);
    } else {
      club = removed;
    }

    return club;
  }



  var hookCache = {};

  gofer.hook = function(event, callback) {
    if (callback) {
      hookCache[event] = hookCache[event] ? manage( hookCache[event], callback ) : [callback];
    } else {
      _.each(hookCache[event], function(subscriber) {
        subscriber(event);
      });
    }
  };



  gofer.value = function(start) {
    var data = start
      , modifiers = []
      , subscribers = [];

    function value(val) {
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

    _.extend(value, {
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

    return value;
  };




  gofer.helpers = function(args) {
    if ( $.isPlainObject(args) ) {
      _.defaults(gofer.helpers.cache, args);
    } else {
      return gofer.helpers.cache[args];
    }
  };

  gofer.helpers.cache = {};

  gofer.helpers.overwrite = function(args) {
    _.extend(gofer.helpers.cache, args);
  };



  gofer.slugs = {
    header: gofer.value(''),
    footer: gofer.value('<input type="submit" id="gofer-submit">')
  };



  function Id(name) {
    this.data = gofer.value();
    Id.subscribe(name, _.bind(this.data, this) );

    this.id = _.uniqueId('gofer');

    gofer.hook('dom', _.bind(function() {
      this.data.subscribe(_.bind(function(data) {
        $('.'+this.id).html( this.content() );
      }, this) );
    }, this) );

    gofer.template('id', '<div class="<%= id %>"><%= content() %></div>');
  }

  _.extend(Id.prototype, {
    edit: function(content) {
      if (content) {
        this.content = function() {
          return _.reduce( this.data(), function(memo, val) {
            return memo + content().replace(/\{\{el\}\}/, val);
          }, '');
        };
      } else {
        this.content = function() {
          return _.reduce( this.data(), function(memo, val) {
            return memo + val;
          }, '', this);
        };
      }
      return gofer.template('id', this);
    },

    view: function(content) {
      return this.content();
    }
  });


  Id.cache = {};


  Id.subscribe = function(name, callback) {
    Id.cache[name] ? callback( Id.cache[name]() ) : ( Id.cache[name] = gofer.value([]) );
    Id.cache[name].subscribe(callback);
  };


  Id.add = function(name, object) {
    Id.cache[name] || ( Id.cache[name] = gofer.value([]) );
    var position = Id.cache[name]().push( object.data() ) - 1;
    object.data.subscribe(function(data) {
      Id.cache[name].update(position, data);
    });
  };



  function El() {}

  _.extend(El.prototype, {
    edit: function() {
      return '{{el}}';
    },

    view: function() {
      return '{{el}}';
    }
  });

  gofer.registerTags({
    el: El
  });



  var lexerTree;

  function lexer(template) {

    return _.map( template.split(/\{\{|\}\}/), function(el, i) {
      if (i % 2 !== 0) {
        var tag = { temp: $.trim(el) }
          , args = {}
          , attributes = tag.temp.match(/\S+\(.*?\)|\S+=".*?"|\S+/g)
          , closingTag
          , isId
        ;
        tag.name = attributes.shift();
        var hasParam = tag.name.match(/(.+?)\((.*?)\)/);


        if ( closingTag = tag.name.match(/\/(.+)/) ) {

          tag.isClosingTag = true;
          tag.name = closingTag[1];

          return tag;
        }

        if ( isId = tag.name.match(/#(.+)/) ) {

          tag.isId = true;
          tag.name = isId[1];
          tag.object = new Id(tag.name);

          return tag;
        }

        if (hasParam) {
          tag.name = hasParam[1];
          args.param = hasParam[2];
        }

        args.htmlAttributes = '';
        var hasId;
        _.each(attributes, function(attr) {
          var hasParam;
          if ( /#(.+)/.test(attr) ) return hasId = attr.match(/#(.+)/)[1];
          if ( hasParam = attr.match(/(.+?)\((.*?)\)/) ) {
            args[ hasParam[1] ] = hasParam[2];
          } else if ( /.+?".*?"/.test(attr) ) {
            args.htmlAttributes += ' ' + attr;
          } else {
            args[attr] = true;
          }
        });

        tag.object = new tags[tag.name](args);
        if (hasId) Id.add(hasId, tag.object);

        return tag;

      } else {
        return el;
      }
    });

  }



  function parser(tree, method) {

    gofer.hook('parser');
    gofer.hook(method);

    function loop(openTag, content) {
      var el = tree.pop();

      if (_.isUndefined(el)) return '';

      if (el.isClosingTag) return loop(el.name, []);

      if (openTag) {

        if (openTag === el.name) {
          return loop() + el.object[method](function() {
            return _.reduce(content, function(memo, el) {
             return memo + ( _.isString(el) ? el : el.object[method].call(el.object) );
           }, '');
          });

        } else {
          content.unshift(el);
          return loop(openTag, content );
        }
      }

      return loop() + ( _.isString(el) ? el : el.object[method]() );
    }

    return loop().replace('{\\{', '{{').replace('}\\}', '}}');
  }


  //add data-attributes
  gofer.getTemplate = function() {
    return _.reduce(lexerTree, function(temp, node) {
      return temp + ( _.isString(node) ? node : '{{' + node.temp + '}}' );
    }, '');
  };



  var templateCache = {};

  gofer.template = function() {
    var args = arguments;

    if ( _.isUndefined(args[0]) ) return _.keys(templateCache);
    if ( $.isPlainObject(args[0]) ) {
      var hash = args[0];
      if ( _.isString( _.values(hash)[0] ) ) {
        _.each(hash, function(val, key) {
          hash[key] = _.template(val);
        });
        _.extend( templateCache, hash );
        return;
      } else {
        _.each(hash, function(val, key) {
          hash[key] = templateCache[key](val);
        });
        return hash;
      }
    }
    if ( _.isObject(args[1]) ) return templateCache[ args[0] ]( args[1] );
    if ( _.isUndefined(args[1]) ) return templateCache[ args[0] ];
    templateCache[ args[0] ] = _.template( args[1] );
    if (args[2]) return templateCache[ args[0] ]( args[2] );

  };



  window.gofer = gofer;

})(window, jQuery, _);