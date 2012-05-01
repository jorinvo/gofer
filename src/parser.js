define(function() {

  function parser(tree, method) {

    function loop(openTag, content) {
      var el = tree.pop();

      if (_.isUndefined(el)) return '';

      if (el.isClosingTag) return loop(el.name, []);

      if (openTag) {

        if (openTag === el.name) {
          return loop() + el.object[method](function() {
            return _.reduce(content, function(memo, el) {
             return memo + ( _.isString(el) ? el : el.object[method].call(el.object) );
           }, '');
          });

        } else {
          content.unshift(el);
          return loop(openTag, content );
        }
      }

      return loop() + ( _.isString(el) ? el : el.object[method]() );
    }

    return loop().replace('{\\{', '{{').replace('}\\}', '}}');
  }

  return parser;
});