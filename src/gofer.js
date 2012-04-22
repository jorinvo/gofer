require([
  'src/id', 'src/helpers', 'src/value'
  ], function(id, helpers, value) {

  var settings = {
    template: './index.gofer',
    dataUrl: '/goferData',
    postUrl: '/',
    updateTemplateUrl: false,
    container: 'body',
    mode: 'edit'
  };

  var gofer = function(args) {

    if ( typeof args === 'string' ) {
      log('implement find by #ID here...');
    } else if( $.isPlainObject(args) ) {
      settings = _.defaults( args, settings );
      gofer.init();
    } else if ( !args ) {
      gofer.init();
    } else {
      throw new Error('invalid arguments');
    }

  };

  gofer.id = id;
  gofer.helpers = helpers;
  gofer.value = value;

  gofer.init = function() {
    require(['text!'+settings.template], function(template) {
      gofer.lexer(template);
    });
  };

  gofer.lexer = function(template) {

    log(_.map( template.split(/\{\{|\}\}/), function(el, i) {
      if (i % 2 !== 0) {
        el = $.trim(el).match(/\S+\(.*?\)|\S+=".*?"|\S+/g);
        return {
          type: 'tag',
          content: el
        };
      } else {
        return {
          type: 'plain',
          content: el
        };
      }
    }));

  };

  gofer.registerTag = function(tags) {
    _.each(tags, function(k, v) {
      if ( !_.has(gofer.tags, k) ) gofer.tags[k] = v;
    });
  };

  gofer.hook = function() {};

  if ( typeof define === "function" && define.amd) {
    define([], function() {
      return gofer;
    });
  } else {
    window.gofer = gofer;
  }

});