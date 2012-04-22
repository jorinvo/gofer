gofer({
  template: './index.gofer',
  dataUrl: '/goferData',
  postUrl: '/',
  updateTemplateUrl: null || '/customUrl'
  container: 'body',
  mode: 'edit' || 'view',
});


//yay! command-line utilities for your browser-console:


//toggle mode
//optional with argument STRING mode
gofer.mode();

//alerts the template with data-attributes
//same thing as sending the data to the updateTemplateUrl when specified
gofer.template();