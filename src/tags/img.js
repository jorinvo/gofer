define(['jquery', 'value', 'helpers', 'hook', 'template', 'loadImage'],
function($, value, helpers, hook, template, loadImage) {


  function Img(args){
    this.hidden = args.hidden;
    this.data = value({});
    this.inputId = _.uniqueId('gofer');
    this.imgId = _.uniqueId('gofer');
    this.src = value('');
    this.src.subscribe(_.bind(function(src) {
      this.data.update('src', src);
    }, this) );
    this.title = value();
    this.title.subscribe(_.bind(function(title) {
      this.data.update('title', title);
    }, this) )(args.title);

    if (args.mix) this.data.modify( helpers(args.mix) );
    this.note = args.note;
    if (args.required) {
      hook( 'submit', _.bind(function() {
        //show a message on the DOM element here
        return this.src();
      }, this) );
    }

    hook('dom', _.bind(function($gofer) {
      var $img = $('#'+this.imgId);

      $gofer.on('change', '#'+this.inputId, function(e) {
        loadImage(e.target.files[0], function(img) {
          $img.html(img);
        });
      });
    }, this) );

    template('img',
      '<% if(note) { %><div class="gofer-note"><%= note %></div><% } %>' +
      '<div id="<%= imgId %>"></div>' +
      '<input type="file" accept="image/*" id="<%= inputId %>">'
    );


  }

  _.extend(Img.prototype, {
    edit: function(content) {
      return template('img', this);
    },

    view: function() {
      return this.hidden ? '' : '<img src="'+this.src()+'">';
    }
  });


  return Img;
});