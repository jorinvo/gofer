{

    "baseUrl": "src",


    "dir": "build",

    "paths": {
        "jquery": "empty:"
    },

    "optimize": "uglify",

    "optimizeCss": "none",

    "inlineText": true,

    "useStrict": false,

    //Skip processing for pragmas.
    "skipPragmas": false,

    //If skipModuleInsertion is false, then files that do not use define()
    //to define modules will get a define() placeholder inserted for them.
    //Also, require.pause/resume calls will be inserted.
    //Set it to true to avoid this. This is useful if you are building code that
    //does not use require() in the built project or in the JS files, but you
    //still want to use the optimization tool from RequireJS to concatenate modules
    //together.
    "skipModuleInsertion": true,

    "modules": [
        {
            "name": "gofer"
        }
    ],

    "wrap": true,

    "fileExclusionRegExp": /^\./,

    "preserveLicenseComments": true

}