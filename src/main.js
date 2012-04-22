var $body = $('body');

var partial = function(file) {
  function matchIt (file) {
    var match;
    if(!(match = file.match(/\{\{partial:\s*(\S+)\s*\}\}/))) {
      $body.append(note(file));
      return;
    }
    require( ['text!../' + match[1]], function(part) {
      file = file.replace(match[0], part);
      matchIt(file);
    });
  }
  matchIt(file);
};

var note = function(file) {
  var match;
  function matchIt (file) {
    if(!(match = file.match(/\{\{\s*note.*\}\}([\w\W]*?)\{\{\/note\}\}/))) return file;
    file = file.replace(match[0], match[1]);
    return matchIt(file);
  }
  return matchIt(file);
};

// partial(file);

var gofer = _.map( file.split(/\{\{|\}\}/), function(el, i) {
  if (i % 2 !== 0) {
    el = $.trim(el).match(/\S+\(.*?\)|\S+=".*?"|\S+/g);
    return {
      type: 'tag',
      content: el
    };
  } else {
    return {
      type: 'plain',
      content: el
    };
  }
});

// log(_.filter(gofer, function(el, i) {
//   return i % 2 !== 0;
// }));

