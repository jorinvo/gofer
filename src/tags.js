(function($, _, undefined) {


  function Input(args) {
    this.id = gofer.id();
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

  }

  _.extend(Input.prototype, {
    edit: function() {
      var html =
      ( this.note ? '<label class="gofer">'+this.note+'</label>' : '' ) +
      '<input type="text" value="'+this.data()+'" id="'+this.id+'" class="gofer">';
      return html;
    },

    view: function() {
      return this.hidden ? '' : this.data();
    }
  });




  function Note() {}

  _.extend(Note.prototype, {
    edit: function(content) {
      return content;
    },

    view: function() {
      return '';
    }
  });



  gofer.registerTags({
    input: Input,
    note: Note
  });


})(jQuery, _);
