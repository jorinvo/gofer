(function($, _, undefined) {


  function Input(args) {
    this.id = _.uniqueId('gofer');
    this.data = gofer.value('');

    this.data.modify(_.escape);

    this.dataOut = args.mix ? function() {
      return gofer.helpers(args.mix)( this.data() );
    } : this.data;

    this.hidden = args.hidden;
    this.note = args.note;

    if (args.required) {
      gofer.hook( 'submit', _.bind(function() {
        //show a message on the DOM element here
        return this.data() === '';
      }, this) );
    }

    gofer.hook( 'dom', _.bind(function() {
      var $el = $('#'+this.id).keyup( _.bind(function() {
        this.data( $el.val() );
      }, this) );
    }, this) );

    gofer.template('input',
      '<% if(note) { %>  <label class="gofer"><%= note %></label><% } %>' +
      '<input type="text" value="<%= data() %>" id="<%= id %>" class="gofer">'
    );
  }

  _.extend(Input.prototype, {
    edit: function() {
      return gofer.template('input', this);
    },

    view: function() {
      return this.hidden ? '' : this.dataOut();
    }
  });




  function Note() {}

  _.extend(Note.prototype, {
    edit: function(content) {
      return content();
    },

    view: function() {
      return '';
    }
  });




  function Link(args) {

    this. htmlAttributes = args.htmlAttributes;

    this.id = _.uniqueId('gofer');
    this.buttonId = _.uniqueId('gofer');
    this.data = gofer.value('');
    if (args.mix) this.data.modify( gofer.helpers(args.mix) );
    this.hidden = args.hidden;
    this.note = args.note;

    if (args.required) {
      gofer.hook( 'submit', _.bind(function() {
        //show a message on the DOM element here
        return this.data() === '';
      }, this) );
    }

    gofer.hook( 'dom', _.bind(function() {
      var $el = $('#'+this.id).keyup( _.bind(function() {
        this.data( $el.val() );
      }, this) );
    }, this) );

    gofer.template('link',
      '<% if(note) { %> <div class="gofer-note"><%= note %></div><% } %>' +
      '<input type="text" <%= htmlAttributes %> >' +
      '<input type="button" id="<%= buttonId %>">'
    );

  }

  _.extend(Link.prototype, {
    edit: function(content) {
      return gofer.template('link', this);
    },

    view: function() {
      return this.hidden ? '' : '<a href="" title="">' + content + '</a>';
    }
  });



  gofer.registerTags({
    input: Input,
    note: Note,
    link: Link
  });


})(jQuery, _);
