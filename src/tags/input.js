define(['gofer'], function(gofer) {

  Input = function(args) {
    this.id = gofer.id();
    this.value = gofer.value();
    this.hidden = args.hidden;
    if (args.required) {
      gofer.hook( 'submit', _.bind(function() {
        //show a message on the DOM element here
        return this.value() === '';
      }, this) );
    }
    this.note = args.note;

    if (args.mix) this.value.modify( gofer.helpers[args.mix] );

    gofer.hook( 'dom', _.bind(function() {
      var $el = $(this.id).keyup( _.bind(function() {
        this.value( $el.val() );
      }, this) );
    }, this) );

  };

  _.extend(Input.prototype, {
    data: '',
    backEnd: function() {
      var html =
      ( this.note ? '<label class="gofer">'+this.note+'</label>' : '' ) +
      '<input type="text" value="'+this.value()+'" id="'+this.id+'" class="gofer">';
      return html;
    },

    frontEnd: function() {
      return this.hidden ? '' : this.value();
    }
  });

  gofer.registerTags({
    input: Input
  });

});