define([], function() {

  var counter = 0;
  var id = function() {
    return 'gofer' + counter++;
  };
  return id;

});