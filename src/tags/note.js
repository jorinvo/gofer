define(['gofer'], function(gofer) {

  Note = function() {

  };

  _.extend(Note.prototype, {
    backEnd: function(content) {
      return content;
    },

    frontEnd: function() {
      return '';
    }
  });

  gofer.registerTag({
    note: Note
  });

});