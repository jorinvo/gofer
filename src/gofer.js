require.config({
  paths: {
    jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min'
  },
  baseUrl: '../src'
});

require(
['jquery', 'lexer', 'parser', 'template', 'value', 'hook', 'helpers', 'tags', 'tags/index', '../libs/json2'],
function($, lexer, parser, template, value, hook, helpers, tags) {


  function gofer(args) {

    if ( typeof args === 'string' ) {
      console.log('implement find by #ID here...');
    } else if( $.isPlainObject(args) ) {
      settings = _.defaults( args, gofer.settings() );
      init();
      return gofer;
    } else if ( !args ) {
      init();
      return gofer;
    } else {
      throw new Error('invalid arguments');
    }

  }

  _.extend(gofer, {
    template: template,
    value: value,
    hook: hook,
    helpers: helpers,
    registerTags: tags.register
  });



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



  var lexerTree;


  function init() {
    $.get(gofer.settings().template, function(template) {
      lexerTree = lexer(template);

      hook('dom', function() {
        $('#gofer-submit').click(function(e) {
          if( !hook('submit') ) e.preventDefault();
        });
      });

      gofer.render();
    });
  }



  gofer.render = function() {
    var mode = gofer.settings().mode;

    var $gofer = $(gofer.settings().container);
    $gofer.html(

      ( mode === 'edit' ? gofer.slugs.header() : '' ) +
      parser( lexerTree.slice(), mode ) +
      ( mode === 'edit' ? gofer.slugs.footer() : '' )

    ).promise().done(function() {
      hook('dom', $gofer);
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



  gofer.slugs = {
    header: value(''),
    footer: value('<input type="submit" id="gofer-submit">')
  };



  //add data-attributes
  gofer.getTemplate = function() {
    return _.reduce(lexerTree, function(temp, node) {
      return temp + ( _.isString(node) ? node : '{{' + node.temp + '}}' );
    }, '');
  };

  template('hidden-field', '<input type="hidden" name="<%= name %>" value="<%= value %>">');

  function sendData() {

    var fields = {};
    _.each(Id.cache, function(val, key) {
      data.fields[key] = val();
    });

    var data = {
      output: gofer.generateOutput(),
      template: gofer.getTemplate(),
      fields: JSON.stringify(fields)
    };

    _.reduce(data, function(res, val, key) {
      return template('hidden-field', {name: key, value: val });
    }, '');
  }



  window.gofer = gofer(window.gofer);

});