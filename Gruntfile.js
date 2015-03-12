module.exports = function(grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-express-server');

  grunt.initConfig({
    express: {
      options: {
        background: false
      },
      dev: {
        options: {
          script: 'app/chat-server.js'
        }
      }
    }
  });

  grunt.registerTask('server', ['express:dev']);

};