define([ "tags", "tags/input", "tags/note", "tags/img", "tags/link" ], function(tags, Input, Note, Img, Link) {

  tags.register({

    input: Input,
    note: Note,
    link: Link,
    img: Img

  });

});