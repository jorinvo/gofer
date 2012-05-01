define(['jquery', 'id', 'tags'], function($, Id, tags) {

  function lexer(template) {

    return _.map( template.split(/\{\{|\}\}/), function(el, i) {
      if (i % 2 !== 0) {
        var tag = { temp: $.trim(el) }
          , args = {}
          , attributes = tag.temp.match(/\S+\(.*?\)|\S+=".*?"|\S+/g)
          , closingTag
          , isId
        ;
        tag.name = attributes.shift();
        var hasParam = tag.name.match(/(.+?)\((.*?)\)/);


        if ( closingTag = tag.name.match(/\/(.+)/) ) {

          tag.isClosingTag = true;
          tag.name = closingTag[1];

          return tag;
        }

        if ( isId = tag.name.match(/#(.+)/) ) {

          tag.isId = true;
          tag.name = isId[1];
          tag.object = new Id(tag.name);

          return tag;
        }

        if (hasParam) {
          tag.name = hasParam[1];
          args.param = hasParam[2];
        }

        args.htmlAttributes = '';
        var hasId;
        _.each(attributes, function(attr) {
          var hasParam;
          if ( /#(.+)/.test(attr) ) return hasId = attr.match(/#(.+)/)[1];
          if ( hasParam = attr.match(/(.+?)\((.*?)\)/) ) {
            args[ hasParam[1] ] = hasParam[2];
          } else if ( /.+?".*?"/.test(attr) ) {
            args.htmlAttributes += ' ' + attr;
          } else {
            args[attr] = true;
          }
        });

        tag.object = new tags.cache[tag.name](args);
        if (hasId) Id.add(hasId, tag.object);

        return tag;

      } else {
        return el;
      }
    });

  }

  return lexer;
});