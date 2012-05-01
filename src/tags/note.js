define(function() {

  function Note() {}

  _.extend(Note.prototype, {

    edit: function(content) {
      return content();
    },

    view: function() {
      return "";
    }

  });

  return Note;
});