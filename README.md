#About Gofer
Gofer helps you to build a WYSIWYG-backend for your clients so that they can edit the content of their website. Gofer targets static one-page websites where a person without any programming knowledge should be able to change same parts of the page.


#Features
* Easy to get started
* Powerful Syntax
* Helpful predefined Widgets
* Easy to extend
* Good Documentation
* Careful testing
* Realworld examples


#Partials
Include an other file using: `{{partial: path/to/component.html}}`


#Text

* One-liner: `<h1>{{input}}</h1>`
* Editor: `<p>{{textarea}}</p>`


#Lists

Make a list of items.

* Define a template inline: `{{list}}template goes here{{/list}}`
* Use a file as template: `{{list: ./path/to/file.html}}`

Attributes: `max`, `min`, `len`


#Images

Define an image with `{{img}}`.
Optional you can pass HTML-Attributes like `{{img id="" class="" alt=""}}`.
When you click this element you can upload an image and refer to its URL by defining an ID-attribute: `{{img #myImage}}`.

Attributes: `path`


#Link

Define a link with `{{link}}` and optional pass HTML-Attributes to it `{{link id="" class="" target=""}}`.


#Files

Specify an element using `{{file}}<element></element>{{/file}}`. When you click this element you can upload a file and refer to its URL by defining an ID-attribute: `{{file #myFile}}`.

Attributes: `path`