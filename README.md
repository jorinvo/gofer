#About Gofer
Gofer helps you to build a WYSIWYG-backend for your clients so that they can edit the content of their website. Gofer targets static one-page websites where a person without any programming knowledge should be able to change same parts of the page.

[parti](#partial)

##Features
* Easy to get started
* Powerful Syntax
* Helpful predefined Widgets
* Easy to extend
* Good Documentation
* Careful testing
* Realworld examples



#Tags


<a name="partial" />
##Partials: `{{partial}}`

Include an other file using: `{{partial: path/to/component.html}}`

Attributes: `hidden`



##One-line text: `{{input}}`

User can input text here e.g. `<h1>{{input}}</h1>` and the plain-text is returned. Because of this you have to wrap it into some tags (e.g. `<h1>`).

Attributes: `required`, `hidden`



##Multi-line text: `{{text}}`

User has a rich text-editor to edit a hole block of content. Create it like `<p>{{text}}</p>`. Text-editor includes bold, italic, cursiv, underlined, link, lists and line-breaks.

Attributes: `required`, `hidden`



##Lists: `{{list}}`

Make a list of items.
You can add new items to list and reorder them via drag & drop.

* Define a template inline: `{{list}}template goes here{{/list}}`
* Use a file as template: `{{list: ./path/to/file.html}}`

Attributes: `max`, `min`, `len`, `required`, `hidden`



##Images: `{{img}}`

Define an image with `{{img}}`.
Optional you can pass HTML-Attributes like `{{img id="" class="" alt=""}}`.
When you click this element you can upload an image and refer to its URL by defining an ID-attribute: `{{img #myImage}}`.
The menu to select an image lets you upload an image and, as long as not set before, lets you specify the alt-attribute.
An other way to upload an image is by dropping it onto the element.

Attributes: `path`, `required`, `hidden`



##Links: `{{link}}`

Define a link with `{{link}}` and optional pass HTML-Attributes to it `{{link id="" class="" target=""}}`.
If you don't use the link-tag as a wrapper like `{{link}}May Message{{/link}}` you can define the displayed text also inside the menu.

Attributes: `required`, `hidden`



##Files: `{{file}}`

Specify an element using `{{file}}<element></element>{{/file}}`. When you click this element you can upload a file and refer to its URL by defining an ID-attribute: `{{file #myFile}}`.
You can upload a file by selecting one in the menu or by dropping it onto the element.


Attributes: `path` ,`required`, `hidden`



##Notes: `{{note}}`

Notes are only visible in editing-mode. They can be used to display instructions to your client about how to edit the page.
`{{note}}some blah blah{{/note}}`



##Options: `{{opt}}`

With the `opt`-tag the user can select between diffrent options the programmer can use to customize the page.
By using the tag as wrapper e.g. `{{opt: []}}placeholder{{/opt}}` clicking the placeholder element will show the option-menu.
The `opt`-tag needs an array of options which is specified like `{{opt: ['option1', 'option2']}}`.
Using the `optn`-tag only makes sense with a defined ID otherwise the options are unreachable.

Attributes: `max`, `min`, `len`, `radio` ,`required`, `hidden`



##Toggles: `{{toggle}}`

`{{toggle #name}}` does the same as `{{option: [true, false] radio #name}}`with the different that it can be used without it to achieve the same as you would by writing `{{toggle #uid}} {{#uid}}blah blah{{/uid}}{{/toggle}}`.

Attributes: `hidden`



##IDs: `{{#id}}`

You can assign every element to an ID. This is done by adding a `#` + a name to an element e.g. `{{input #name}}`.

Attributes: `hidden`



#Attributes


##`js:`

##`desc:`


##`hidden`

Use `hidden` when you want the user to give you information through a tag without that the information is displayed at this place.

Tags: `partial`, `input`, `text`, `list`, `img`, `link`, `file`, `opt`, `toggle`, `#`


##`required`

Tags marked with `required` have to contain some information, otherwise the page can't be updated.

Tags: `input`, `text`, `list`, `img`, `link`, `file`, `opt`


##`max:`

Define a maximum required size the user has to create or select.

Tags: `list`, `opt`


##`min:`

Define a minimum required size the user has to create or select.

Tags: `list`, `opt`


##`len:`

Define the required size the user has to create or select. Is a shortcode for setting `max` and `min` to the same value.

Tags: `list`, `opt`


##`radio`

Treat the options as radiobuttons. One one option can be selected at the same time.

Tags: `opt`


##`path:`

Specify a path the given file should be located at on your server.

Tags: `img`, `file`