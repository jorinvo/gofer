define(['value', 'helpers', 'hook', 'template'],
function(value, helpers, hook, template) {


  function Link(args) {

    this. htmlAttributes = args.htmlAttributes;

    this.id = _.uniqueId('gofer');
    this.buttonId = _.uniqueId('gofer');
    this.hrefId = _.uniqueId('gofer');

    this.data = value({});
    this.data.subscribe(_.bind(function(data) {
      this.text(data.text);
      this.href(data.href);
    }, this) );

    this.text = value('');
    this.text.subscribe(_.bind(function(text) {
      this.data.updateSilent('text', text);
    }, this) );

    this.href = value('');
    this.href.subscribe(_.bind(function(href) {
      this.data.updateSilent('href', href);
    }, this) )(args.href);

    if (args.mix) this.data.modify( helpers(args.mix) );

    this.hidden = args.hidden;
    this.note = args.note;

    if (args.required) {
      hook( 'submit', _.bind(function() {
        //show a message on the DOM element here
        return this.text() && this.href();
      }, this) );
    }

    hook( 'dom', _.bind(function() {

      var $textInput = $('#'+this.id).on('keyup', _.bind(function() {
        this.text( $textInput.val() );
      }, this) );

      var $hrefInput = $('#'+this.hrefId).on('keyup', _.bind(function() {
        this.href( $hrefInput.val() );
      }, this) );

      $('#'+this.buttonId).on('click', function() {
        $hrefInput.toggle();
      });

      this.data.subscribe(function(data) {
        $textInput.val(data.text);
        $hrefInput.val(data.href);
      });

      $textInput.val(this.text());
      $hrefInput.val(this.href());

    }, this) );

    template('link',
      '<% if(note) { %> <div class="gofer-note"><%= note %></div><% } %>' +
      '<input type="text" id="<%= id %>" <%= htmlAttributes %> >' +
      '<input type="button" id="<%= buttonId %>">' +
      '<input type="text" id="<%= hrefId %>">'
    );

  }

  _.extend(Link.prototype, {

    edit: function(content) {
      return template('link', this);
    },

    view: function() {
      return this.hidden ? '' : '<a href="' + this.href() + '" title="">' + this.text() + '</a>';
    }

  });


  return Link;
});