#About Gofer
Gofer helps you to build a WYSIWYG-backend for your clients so that they can edit the content of their website. Gofer targets static one-page websites where a person without any programming knowledge should be able to change same parts of the page.


-------------------------------


##[Tags](#tags)

* [#id](#tagId)
* [input](#input)
* [text](#text)
* [link](#link)
* [img](#img)
* [file](#file)
* [files](#files)
* [check](#check)
* [radio](#radio)
* [toggle](#toggle)
* [list](#list)
* [note](#note)
* [partial](#partial)



##[Attributes](#attributes)

* [id](#attrId)
* [mix](#mix)
* [required](#required)
* [hidden](#hidden)
* [path](#path)
* [radio](#radio)
* [max](#max)
* [min](#min)
* [len](#len)
* [note](#note)


-----------------------------------


##Features
* Easy to get started
* Powerful Syntax
* Helpful predefined Widgets
* Easy to extend
* Good Documentation
* Careful testing
* Realworld examples




------------------------------------


<a name="tags" />
#Tags




<a name="tagId" />
##ID: `{{#id}}`

The `#id`-tag can be used in three different ways.
By using it as a standalone tag it returns the values the linked elements evaluate to. For example if you have an `{{input #name}}`-tag at one place in your code, you can insert the value of the element at an other place in your code using `{{#name}}`.
The `#id''-tag can also be used as a wrapper. The first thing the wrapper does is to decide whether the wrapped content gets displayed or not. This depends on the values of the referenced elements. The wrapper iterates over all elements and decides for each element if it should be displayed or not. It only gets displayed when its value is not empty and is not a javascript falsy value. Inside the loop each item is available as the `el`-tag.

Attributes: [`mix`](#mix)



<a name="el" />
##Loop-Element: `{{el}}`

The `el`-tag references to the element inside a loop. For more information read ['the section about `#id`'](#tagId).

Attributes: [`mix`](#mix)



<a name="input" />
##One-line Text: `{{input}}`

The user can input text here e.g. `<h1>{{input}}</h1>` and the plain-text is returned. Because of this you have to wrap it into some tags (e.g. `<h1>`).

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`note`](#note)

Properties: [`content`](#content)



<a name="text" />
##Multi-line Text: `{{text}}`

The user has a rich text-editor to edit a hole block of content. Create it like `<p>{{text}}</p>`. Text-editor includes bold, italic, cursiv, underlined, link, lists and line-breaks.

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`note`](#note)

Properties: [`content`](#content)



<a name="link" />
##Link: `{{link}}`

Define a link with `{{link}}` and optional pass HTML-Attributes to it `{{link id="" class="" target=""}}`.
If you don't use the link-tag as a wrapper like `{{link}}May Message{{/link}}` you can also define the displayed text and the title inside the menu.

Attributes: [`mix`](#mix)[`required`](#required), [`hidden`](#hidden)

Properties: [`content`](#content), [`href`](#href), [`title`](#title)



<a name="img" />
##Image: `{{img}}`

Define an image with `{{img}}`.
Optional you can pass HTML-Attributes like `{{img id="" class="" alt="" title=""}}`.
When you click this element you can upload an image and refer to its `path` by defining an ID-attribute: `{{img #myImage}}`.
The menu to select an image lets you upload an image and, as long as not set before, lets you specify the alt-&title-attributes.
An other way to upload an image is by dropping it onto the element.

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`path`](#path), [`note`](#note)

Properties: [`title`](#title)



<a name="file" />
##File: `{{file}}`

Specify an element using `{{file}}<element></element>{{/file}}`. When you click this element you can upload a file and refer to its `path` by defining an ID-attribute: `{{file #myFile}}`.
You can upload a file by selecting one in the menu or by dropping it onto the element.

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`path`](#path), [`note`](#note)



<a name="files" />
##Files: `{{files}}`

Create a multi-file-uploder with `{{files #id}}`. Uploader also supports drag & drop.


Attributes: [`mix`](#mix), [`required`](#required), [`path`](#path), [`note`](#note)



<a name="check" />
##Option: `{{check}}`

With the `check`-tag the user can select between diffrent options the programmer can use to customize the page.
By using the tag as wrapper e.g. `{{check: []}}placeholder{{/check}}` clicking the placeholder element will show the option-menu.
The `check`-tag needs an array of options which is specified like `{{check: ['option1', 'option2']}}`.
Using the `optn`-tag only makes sense with a defined ID otherwise the options are unreachable.

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`radio`](#radio), [`max`](#max), [`min`](#min), [`len`](#len), [`note`](#note)

Properties: [`content`](#content), [`yes`](#yes), [`no`](#no), [`all`](#all)



<a name="toggle" />
##Toggle: `{{toggle}}`

`{{toggle #name}}` does the same as `{{check: [true, false] radio #name}}`with the different that it can be used without it to achieve the same as you would by writing `{{toggle #uid}} {{#uid}}blah blah{{/uid}}{{/toggle}}`.

Attributes: [`mix`](#mix), [`hidden`](#hidden), [`note`](#note)

Properties: [`val`](#val)



<a name="list" />
##List: `{{list}}`

Make a list of items.
You can add new items to the list and reorder them via drag & drop.

* Define a template inline: `{{list}}template goes here{{/list}}`
* Use a file as template: `{{list path: ./path/to/file.html}}`

Attributes: [`mix`](#mix), [`required`](#required), [`hidden`](#hidden), [`path`](#path), [`max`](#max), [`min`](#min), [`len`](#len), [`note`](#note)

Properties: [`len`](#propLen), [`temp`](#temp)



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



<a name="content" />
##`}}content{{`

The content-attribute contains a `STRING` of content which gets rendered in the DOM. This attribute differs from the other attributes since it is the content wrapped between to tags.
For the `link`-tag the content is only editable when the [`editable`-attribute](#editable) is set and the content of `list` is alway write-only.


Tags: [`input`](#input), [`text`](#text), [`link`](#link), [`list`](#list)



<a name="attrId" />
##`#id`

You can assign every element to an ID. This is done by adding a `#` + a name to an element e.g. `{{input #name}}`.

Tags: [`#`](#identifier), [`input`](#input), [`text`](#text), [`link`](#link), [`img`](#img), [`file`](#file), [`files`](#files), [`check`](#check), [`toggle`](#toggle), [`list`](#list)



<a name="mix" />
##`mix:`

Using the `mix`-attribute you can specify a function. Gofer searchs for the specified function in the context of your helper-files. When the function exists it gets called with the element as argument and the element's value will be set to the return-value of the function-call.
The element-object the function gets called with differs from element to element, but every element-object contains an attributes-hash called `attr` and the DOM-element representing it as `el`.
For additional tag-specific properties have a look at the tags.

Tags: [`#`](#identifier), [`input`](#input), [`text`](#text), [`link`](#link), [`img`](#img), [`file`](#file), [`files`](#files), [`check`](#check), [`toggle`](#toggle), [`list`](#list)



<a name="required" />
##`required`

Tags marked with `required` have to contain some information, otherwise the page can't be updated.

Tags: [`input`](#input), [`text`](#text), [`link`](#link), [`img`](#img), [`file`](#file), [`files`](#files), [`check`](#check), [`list`](#list)



<a name="hidden" />
##`hidden`

Use `hidden` when you want the user to give you information through a tag without that the information is displayed at this place.

Tags: [`#`](#identifier), [`input`](#input), [`text`](#text), [`link`](#link), [`img`](#img), [`file`](#file), [`files`](#files), [`check`](#check), [`toggle`](#toggle), [`list`](#list)



<a name="path" />
##`path:`

Specify a path the given file should be or is located at on your server.

Tags: [`img`](#img), [`file`](#file), [`files`](#files), ['list'](#list)



<a name="radio" />
##`radio`

Treat the options as radiobuttons. Only one option can be selected at the same time.

Tags: [`check`](#check)



<a name="max" />
##`max:`

Define a maximum required size the user has to create or select.

Tags: [`check`](#check), [`list`](#list)



<a name="min" />
##`min:`

Define a minimum required size the user has to create or select.

Tags: [`check`](#check), [`list`](#list)



<a name="len" />
##`len:`

Define the required size the user has to create or select. Is a shortcode for setting `max` and `min` to the same value. Use it e.g. `{{list len: 3}}`.  In javascript-mode `len` is read-only and returns the current length of the element.

Tags: [`check`](#check), [`list`](#list)



<a name="note" />
##`note:`

Create a `note`-element which describes the given element. Use it like `{{input note: 'Enter your name here'}}`. Since this note is related to an element Gofer can tell you more about what you are doing e.g. telling you which required fields you left empty.

Tags: [`input`](#input), [`text`](#text), [`img`](#img), [`file`](#file), [`files`](#files), [`opt`](#opt), [`toggle`](#toggle), [`list`](#list)



<a name="title" />
##`title`

The `title`-property sets the html-title-attribute and in the case of an `<img>`-tag  it also will be used for the `alt`-attribute. You can predefine it but it stays editable for the user.

Tags: [`link`](#link), [`img`](#img)



<a name="href" />
##`href`

The `href`-property sets the html-href-attribute. You can predefine it but it stays editable for the user.

Tags: [`link`](#link)



<a name="yes" />
##`yes`

`yes` returns all selected values. It's a shortcode for filtering the values by yourself. Keep attention when you use it as a setter because you can only set ether `yes` or `no`, never both of them. When using it as a setter use it like `{{check: ['apple', 'orange', banana'] yes: ['orange']}}.

Tags: [`check`](#check)



<a name="no" />
##`no`

`no` returns all unselected values. It's a shortcode for filtering the values by yourself. Keep attention when you use it as a setter because you can only set ether `yes` or `no`, never both of them. When using it as a setter use it like `{{check: ['apple', 'orange', banana'] no: ['apple', 'banana']}}.

Tags: [`check`](#check)



<a name="val" />
##`val`

With `val` you can specify the preselected value of the element. In the case of `toggle` it is only `true` or `false`. In read-mode `val` returns the selected value.

Tags: [`radio`](#radio) , [`toggle`](#toggle)