define(["value", "helpers", "hook", "template"], function(value, helpers, hook, template) {

  function Input(args) {
    this.id = _.uniqueId('gofer');
    this.data = value(args.data);

    this.data.modify(_.escape);

    this.dataOut = args.mix ? function() {
      return helpers(args.mix)( this.data() );
    } : this.data;

    this.hidden = args.hidden;
    this.note = args.note;

    if (args.required) {
      hook( 'submit', _.bind(function() {
        //show a message on the DOM element here
        return this.data();
      }, this) );
    }

    hook( 'dom', _.bind(function() {

      var $el = $('#'+this.id).on('keyup', _.bind(function() {
        this.data( $el.val() );
      }, this) );

      this.data.subscribe(function(data) {
        $el.val(data);
      });

      $el.val(this.data());

    }, this) );

    template('input',
      '<% if(note) { %>  <label class="gofer"><%= note %></label><% } %>' +
      '<input type="text" id="<%= id %>" class="gofer">'
    );
  }

  _.extend(Input.prototype, {
    edit: function() {
      return template('input', this);
    },

    view: function() {
      return this.hidden ? '' : this.dataOut();
    }
  });


  return Input;
});