module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg      : grunt.file.readJSON('package.json'),
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('default', ['bower']);
};