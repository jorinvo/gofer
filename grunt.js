module.exports = function(grunt) {

  grunt.initConfig({
    mocha: {
      index: ['test/index.html']
    },
    requirejs: {
      baseUrl: 'src',
      out: 'gofer.js',
      inlineText: true,
      name: '../libs/almond',
      include: ['gofer'],
      wrap: true
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-requirejs');

  grunt.registerTask('build', 'requirejs');
  grunt.registerTask('test', 'mocha');

};