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
    this.hrefId = _.uniqueId('gofer');
    this.data = gofer.value({});
    this.text = gofer.value('');
    this.text.subscribe(_.bind(function(text) {
      this.data.update('text', text);
    }, this) );
    this.href = gofer.value();
    this.href.subscribe(_.bind(function(href) {
      this.data.update('href', href);
    }, this) )(args.href);
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
        this.text( $el.val() );
      }, this) );
      var $hrefInput = $('#'+this.hrefId).keyup(_.bind(function() {
        this.href( $hrefInput.val() );
      }, this) );
      $('#'+this.buttonId).click(function() {
        $hrefInput.toggle();
      });
    }, this) );

    gofer.template('link',
      '<% if(note) { %> <div class="gofer-note"><%= note %></div><% } %>' +
      '<input type="text" id="<%= id %>" value="<%= text() %>" <%= htmlAttributes %> >' +
      '<input type="button" id="<%= buttonId %>">' +
      '<input type="text" id="<%= hrefId %>" value="<%= href() %>">'
    );

  }

  _.extend(Link.prototype, {
    edit: function(content) {
      return gofer.template('link', this);
    },

    view: function() {
      return this.hidden ? '' : '<a href="' + this.href() + '" title="">' + this.text() + '</a>';
    }
  });



  function Img(args){
    this.hidden = args.hidden;
    this.data = ({});
    this.src = gofer.value('');
    this.src.subscribe(_.bind(function(src) {
      this.data.update('src', src);
    }, this) );
    this.title = gofer.value();
    this.title.subscribe(_.bind(function(title) {
      this.data.update('title', title);
    }, this) )(args.title);

    if (args.mix) this.data.modify( gofer.helpers(args.mix) );
    this.note = args.note;
    if (args.required) {
      gofer.hook( 'submit', _.bind(function() {
        //show a message on the DOM element here
        return this.data() === '';
      }, this) );
    }

    gofer.template('img',
      '<% if(note) { %><div class="gofer-note"><%= note %></div><% } %>' +
      '<input type="file">'
    );


  }

  _.extend(Img.prototype, {
    edit: function(content) {
      return gofer.template('img', this);
    },

    view: function() {
      return this.hidden ? '' : '<img src="'+this.src()+'">';
    }
  });



  gofer.registerTags({
    input: Input,
    note: Note,
    link: Link,
    img: Img
  });


})(jQuery, _);
