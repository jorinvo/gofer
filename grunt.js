module.exports = function(grunt) {

  // Project configuration.
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

  // Default task.
  grunt.registerTask('build', 'requirejs');
  grunt.registerTask('test', 'mocha');

};