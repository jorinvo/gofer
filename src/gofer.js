(function(window, $, _, undefined) {



  function gofer(args) {

    if ( typeof args === 'string' ) {
      console.log('implement find by #ID here...');
    } else if( $.isPlainObject(args) ) {
      _settings = _.defaults( args, gofer.settings() );
      init();
    } else if ( !args ) {
      init();
    } else {
      throw new Error('invalid arguments');
    }

  }

  var _settings = {
    template: './index.gofer',
    dataUrl: '/goferData',
    postUrl: '/',
    updateTemplateUrl: false,
    container: 'body',
    mode: 'edit'
  };

  gofer.settings = function() {
    return _settings;
  };

  var _tree;

  function init() {
    $.get(gofer.settings().template, function(template) {
      _tree = _lexer(template);

      gofer.hook('domReady', function() {
        $('#gofer-submit').click(function(e) {
          gofer.mode();
        });
      });

      gofer.render();
    });
  };


  gofer.render = function() {
    var mode = gofer.settings().mode;

    $(gofer.settings().container).html(

      ( mode === 'edit' ? gofer.slugs.header() : '' ) +
      _parser( _tree.slice(), mode ) +
      ( mode === 'edit' ? gofer.slugs.footer() : '' )

    ).promise().done(function() {
      gofer.hook('domReady');
    });
  };



  gofer.mode = function(mode) {
    if ( mode && !(mode in ['edit', 'view']) ) {
      console.log("Invalid mode.\nValid modes: 'edit', 'view'");
      return;
    }
    _settings.mode = ( gofer.settings().mode === 'edit' ? 'view' : 'edit' );
    gofer.render();
  };



  gofer.generateOutput = function(input) {
    var output = $('html').clone();
    output.find(gofer.settings().container).html(input);
    return output.html();
  };



  var _tags = {};

  gofer.registerTags = function(newTags) {
    _.each(newTags, function(v, k) {
      if ( !_.has(_tags, k) ) {
        _tags[k] = v;
      }
    });
  };

  var idCounter = -1;

  gofer.id = function() {
    return 'gofer' + (++idCounter);
  };

  gofer.id.last = function() {
    return 'gofer' + idCounter;
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
      if (val) {
        data = val;
        _.each(subscribers, function(s) {
          s(data);
        });
      }
      return _.reduce(modifiers, function(memo, modifier) {
        return modifier(memo);
      }, data);
    }

    _.extend(value, {
      modify: function(modifier) {
        modifiers = manage(modifiers, modifier);
      },
      subscribe: function(subscriber) {
        subscribers = manage(subscribers, subscriber);
      }
    });

    return value;
  };



  var helpersCache = {};

  gofer.helpers = function(args) {
    if ( $.isPlainObject(args) ) {
      _.defaults(helpersCache, args);
    } else {
      return helpersCache[args];
    }
  };

  gofer.helpers.overwrite = function(args) {
    _.extend(helpersCache, args);
  };



  gofer.slugs = {
    header: gofer.value(''),
    footer: gofer.value('<input type="submit" id="gofer-submit">')
  };

  _lexer = function(template) {

    return _.map( template.split(/\{\{|\}\}/), function(el, i) {
      if (i % 2 !== 0) {
        var tag = { temp: $.trim(el) }
          , args = {}
          , attributes = tag.temp.match(/\S+\(.*?\)|\S+=".*?"|\S+/g)
          , closingTag
          , id
        ;
        tag.name = attributes.shift();
        var hasParam = tag.name.match(/(.+?)\((.*?)\)/);


        if ( closingTag = tag.name.match(/\/(.+)/) ) {

          tag.isClosingTag = true;
          tag.name = closingTag[1];

          return tag;
        }

        if ( id = tag.name.match(/#(.+)/) ) {

          tag.isId = true;
          tag.name = id[1];
          tag.object = new Id(tag.name);

          return tag;
        }

        if (hasParam) {
          tag.name = hasParam[1];
          args.param = hasParam[2];
        }

        args.htmlAttributes = '';

        _.each(attributes, function(attr) {
          var hasParam;
          if ( /#.+/.test(attr) ) {

          } else if ( hasParam = attr.match(/(.+?)\((.*?)\)/) ) {
            args[ hasParam[1] ] = hasParam[2];
          } else if ( /.+?".*?"/.test(attr) ) {
            args.htmlAttributes += ' ' + attr;
          } else {
            args[attr] = true;
          }
        });

        tag.object = new _tags[tag.name](args);

        return tag;

      } else {
        return el;
      }
    });

  };



  _parser = function(tree, method) {

    gofer.hook('parser');
    gofer.hook(method);

    function parser(openTag, content) {
      var el = tree.pop();

      if (_.isUndefined(el)) return '';

      if (el.isClosingTag) return parser(el.name, '');

      if (openTag) {

        if (openTag === el.name) {
          return parser() + el.object[method](content);

        } else {
          return parser(openTag, content += _.isString(el) ? el : el.object[method]() );
        }
      }

      return parser() + ( _.isString(el) ? el : el.object[method]() );
    }

    return parser();
  };


  //add data-attributes
  gofer.getTemplate = function() {
    return _.reduce(_tree, function(temp, node) {
      return temp + ( _.isString(node) ? node : '{{' + node.temp + '}}' );
    }, '');
  };


  window.gofer = gofer;

})(window, jQuery, _);