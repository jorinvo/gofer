require.config({ baseUrl: '../src' });

require(
['lexer', 'parser', 'template', 'value', 'hook', 'helpers', 'id', 'tags', 'tags/index', '../libs/json2'],
function(lexer, parser, template, value, hook, helpers, Id, tags) {


  function gofer(args) {

    if ( typeof args === 'string' ) {
      console.log('implement find by #ID here...');
    } else if( $.isPlainObject(args) ) {
      settings = _.defaults( args, settings );
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
    registerTags: tags.register,
    $container: null
  });



  var settings = {
    template: './template.html',
    dataUrl: './goferData',
    postUrl: '.',
    container: 'body',
    mode: 'edit',
    uploadDir: 'uploads',
    data: false,
    success: false
  };

  gofer.settings = function() {
    return settings;
  };



  var lexerTree;


  function init() {

    if (settings.success) {
      gofer.slugs.header.modify(function(header) {
        return '<div class="gofer-success">SUCCESS!</div>' + header;
      });
    }

    if (settings.data) {
      hook('dom', function() {
        gofer.data(settings.data);
      });
    }

    gofer.$container = $(settings.container);

    $.get(settings.template, function(template) {
      lexerTree = lexer(template);

      hook('dom', function() {
        $('#gofer-submit').click(function(e) {
          e.preventDefault();
          gofer.submit();
        });
      });

      gofer.render();
    });
  }



  gofer.render = function() {
    var mode = settings.mode;

    gofer.$container.html(

      ( mode === 'edit' ? gofer.slugs.header() : '' ) +
      parser( lexerTree.slice(), mode ) +
      ( mode === 'edit' ? gofer.slugs.footer() : '' )

    ).promise().done(function() {
      hook('dom', gofer.$container);
    });
  };

  gofer.data = function(data) {
    if (data) {
      _.each(JSON.parse(data), function(values, name) {
        _.each(values, function(value, position) {
          Id.update(name, position, value);
        });
      });
    } else {
      var fields = {};
      _.each(Id.cache, function(field, name) {
        fields[name] = field.data();
      });
      return JSON.stringify(fields);
    }
  };

  gofer.mode = function(mode) {
    if ( mode && !(mode in ['edit', 'view']) ) {
      console.log("Invalid mode.\nValid modes: 'edit', 'view'");
      return;
    }
    settings.mode = ( settings.mode === 'edit' ? 'view' : 'edit' );
    gofer.render();
  };



  gofer.generateOutput = function() {
    var output = $('html').clone();
    output.find(settings.container).html( parser(lexerTree.slice(), 'view') );
    return '<html>' +
      output.html().replace(/<!--\s*?gofer\s*?-->[\s\S]*?(<!--\s*?\/\s*?gofer\s*?-->)/, '') +
      '</html>';
  };



  gofer.slugs = {
    header: value('<form id="gofer-form" method="post">'),
    footer: value('<input type="submit" id="gofer-submit"></form>')
  };



  //add data-attributes
  gofer.getTemplate = function() {
    return _.reduce(lexerTree, function(temp, node) {
      return temp + ( _.isString(node) ? node : '{{' + node.temp + '}}' );
    }, '');
  };

  template('hidden-field', '<input type="hidden" name="<%- name %>" value="<%- value %>">');

  gofer.submit = function() {
    if( hook('submit') ) {

      var data = {
        output: gofer.generateOutput(),
        fields: gofer.data()
      };


      $('#gofer-form').append(
        _.reduce(data, function(res, val, key) {
          return res + template('hidden-field', {name: key, value: val });
        }, '')
      );

      $('#gofer-form').submit();

    }
  };



  window.gofer = gofer(window.gofer);

});