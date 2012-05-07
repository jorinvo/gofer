define(['value', 'helpers', 'hook', 'template', 'loadImage'],
function(value, helpers, hook, template, loadImage) {


  function Img(args){

    this.hidden = args.hidden;
    this.note = args.note;
    this.id = args.id;

    this.inputId = _.uniqueId('gofer');
    this.imgId = _.uniqueId('gofer');

    this.data = value({})
      .subscribe(_.bind(function(data) {
        this.src(data.src);
      }, this) );

    this.src = value('')
      .subscribe(_.bind(function(src) {
        this.data.updateSilent('src', src);
      }, this) );

    if (args.mix) this.data.modify( helpers(args.mix) );

    if (args.required) {
      hook( 'submit', _.bind(function() {
        //show a message on the DOM element here
        return this.src();
      }, this) );
    }

    hook('dom', _.bind(function($gofer) {

      var $img = $('#'+this.imgId);

      $gofer.on('change', '#'+this.inputId, _.bind(function(e) {
        var file = e.target.files[0];
        this.src( gofer.settings().uploadDir + '/' + this.id + file.name.match(/\..+$/)[0] );
        loadImage(file, function(img) {
          $img.html(img);
        });
      }, this) );

      this.data.subscribe(_.bind(function() {
        $img.html('<img src="' + this.src() + '">');
      }, this) );

      $img.html('<img src="' + this.src() + '">');

    }, this) );

    template('img',
      '<% if(note) { %><div class="gofer-note"><%= note %></div><% } %>' +
      '<div id="<%= imgId %>"></div>' +
      '<input type="file" name="<%= id %>" accept="image/*" id="<%= inputId %>">'
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