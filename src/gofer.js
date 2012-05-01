require.config({
  paths: {
    jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
    // jquery: '../libs/jquery'
    underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min'
    // underscore: '../libs/underscore'
  },
  baseUrl: '../src'
});

require(
['jquery', 'lexer', 'parser', 'template', 'value', 'hook', 'helpers', 'tags', 'tags/index', 'underscore'],
function($, lexer, parser, template, value, hook, helpers, tags) {


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
    header: value('<form method="post">'),
    footer: value('<input type="submit" id="gofer-submit"></form>')
  };



  //add data-attributes
  gofer.getTemplate = function() {
    return _.reduce(lexerTree, function(temp, node) {
      return temp + ( _.isString(node) ? node : '{{' + node.temp + '}}' );
    }, '');
  };



  window.gofer = gofer;

});