#About Gofer
Gofer helps you to build a WYSIWYG-backend for your clients so that they can edit the content of their website. Gofer targets static one-page websites where a person without any programming knowledge should be able to change same parts of the page.



##[Tags](#tags)

* [#id](#identifier)
* [input](#input)
* [text](#text)
* [link](#link)
* [img](#img)
* [file](#file)
* [files](#files)
* [opt](#opt)
* [toggle](#toggle)
* [list](#list)
* [note](#note)
* [partial](#partial)



##[Attributes](#attributes)

* [mix](#mix)
* [required](#required)
* [hidden](#hidden)
* [path](#path)
* [radio](#radio)
* [max](#max)
* [min](#min)
* [len](#len)
* [note](#note)



##Features
* Easy to get started
* Powerful Syntax
* Helpful predefined Widgets
* Easy to extend
* Good Documentation
* Careful testing
* Realworld examples




<a name="tags" />
#Tags




<a name="identifier" />
##ID: `{{#id}}`

You can assign every element to an ID. This is done by adding a `#` + a name to an element e.g. `{{input #name}}`.

Attributes: [`mix`](#mix), [`hidden`](#hidden)



<a name="input" />
##One-line Text: `{{input}}`

User can input text here e.g. `<h1>{{input}}</h1>` and the plain-text is returned. Because of this you have to wrap it into some tags (e.g. `<h1>`).

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`note`](#note)



<a name="text" />
##Multi-line Text: `{{text}}`

User has a rich text-editor to edit a hole block of content. Create it like `<p>{{text}}</p>`. Text-editor includes bold, italic, cursiv, underlined, link, lists and line-breaks.

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`note`](#note)



<a name="link" />
##Link: `{{link}}`

Define a link with `{{link}}` and optional pass HTML-Attributes to it `{{link id="" class="" target=""}}`.
If you don't use the link-tag as a wrapper like `{{link}}May Message{{/link}}` you can define the displayed text and the title also inside the menu.

Attributes: [`mix`](#mix)[`required`](#required), [`hidden`](#hidden)



<a name="img" />
##Image: `{{img}}`

Define an image with `{{img}}`.
Optional you can pass HTML-Attributes like `{{img id="" class="" alt="" title=""}}`.
When you click this element you can upload an image and refer to its `path` by defining an ID-attribute: `{{img #myImage}}`.
The menu to select an image lets you upload an image and, as long as not set before, lets you specify the alt-&title-attributes.
An other way to upload an image is by dropping it onto the element.

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`path`](#path), [`note`](#note)



<a name="file" />
##File: `{{file}}`

Specify an element using `{{file}}<element></element>{{/file}}`. When you click this element you can upload a file and refer to its `path` by defining an ID-attribute: `{{file #myFile}}`.
You can upload a file by selecting one in the menu or by dropping it onto the element.

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`path`](#path), [`note`](#note)



<a name="files" />
##Files: `{{files}}`

Create a multi-file-uploder with `{{files #id}}`. Uploader also supports drag & drop.


Attributes: [`mix`](#mix), [`required`](#required), [`path`](#path), [`note`](#note)



<a name="opt" />
##Option: `{{opt}}`

With the `opt`-tag the user can select between diffrent options the programmer can use to customize the page.
By using the tag as wrapper e.g. `{{opt: []}}placeholder{{/opt}}` clicking the placeholder element will show the option-menu.
The `opt`-tag needs an array of options which is specified like `{{opt: ['option1', 'option2']}}`.
Using the `optn`-tag only makes sense with a defined ID otherwise the options are unreachable.

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`radio`](#radio), [`max`](#max), [`min`](#min), [`len`](#len), [`note`](#note)



<a name="toggle" />
##Toggle: `{{toggle}}`

`{{toggle #name}}` does the same as `{{option: [true, false] radio #name}}`with the different that it can be used without it to achieve the same as you would by writing `{{toggle #uid}} {{#uid}}blah blah{{/uid}}{{/toggle}}`.

Attributes: [`mix`](#mix), [`hidden`](#hidden), [`note`](#note)



<a name="list" />
##List: `{{list}}`

Make a list of items.
You can add new items to the list and reorder them via drag & drop.

* Define a template inline: `{{list}}template goes here{{/list}}`
* Use a file as template: `{{list: ./path/to/file.html}}`

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`max`](#max), [`min`](#min), [`len`](#len), [`note`](#note)



<a name="note" />
##Note: `{{note}}`

Notes are only visible in editing-mode. They can be used to display instructions to your client about how to edit the page.
`{{note}}some blah blah{{/note}}`



<a name="partial" />
##Partial: `{{partial}}`

Include an other file using: `{{partial: path/to/component.html}}`


--------------------------------


<a name="attributes" />
#Attributes



<a name="mix" />
##`mix:`

Using the `mix`-attribute you can specify a function. Gofer searchs for the function in the context of your helper-files. When the function exists it gets called with the element as argument and the element's value will be set to the return-value of the function-call.

Tags: [`#`](#identifier), [`input`](#input), [`text`](#text), [`link`](#link), [`img`](#img), [`file`](#file), [`files`](#files), [`opt`](#opt), [`toggle`](#toggle), [`list`](#list)



<a name="required" />
##`required`

Tags marked with `required` have to contain some information, otherwise the page can't be updated.

Tags: [`input`](#input), [`text`](#text), [`link`](#link), [`img`](#img), [`file`](#file), [`files`](#files), [`opt`](#opt), [`list`](#list)



<a name="hidden" />
##`hidden`

Use `hidden` when you want the user to give you information through a tag without that the information is displayed at this place.

Tags: [`#`](#identifier), [`input`](#input), [`text`](#text), [`link`](#link), [`img`](#img), [`file`](#file), [`files`](#files), [`opt`](#opt), [`toggle`](#toggle), [`list`](#list)



<a name="path" />
##`path:`

Specify a path the given file should be located at on your server.

Tags: [`img`](#img), [`file`](#file), [`files`](#files)



<a name="radio" />
##`radio`

Treat the options as radiobuttons. One one option can be selected at the same time.

Tags: [`opt`](#opt)



<a name="max" />
##`max:`

Define a maximum required size the user has to create or select.

Tags: [`opt`](#opt), [`list`](#list)



<a name="min" />
##`min:`

Define a minimum required size the user has to create or select.

Tags: [`opt`](#opt), [`list`](#list)



<a name="len" />
##`len:`

Define the required size the user has to create or select. Is a shortcode for setting `max` and `min` to the same value.

Tags: [`opt`](#opt), [`list`](#list)



<a name="note" />
##`note:`

Create a `note`-element which describes the given element. Use it like `{{input note: 'Enter your name here'}}`. Since this note is related to an element Gofer can tell you more about what you are doing e.g. telling you which required fields you left empty.

Tags: [`input`](#input), [`text`](#text), [`img`](#img), [`file`](#file), [`files`](#files), [`opt`](#opt), [`toggle`](#toggle), [`list`](#list)



