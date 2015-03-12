module.exports = function(grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({

    'browserify': {
      'app/public/main.js': 'app/public/client.js'
    },

    'express': {
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

  grunt.registerTask('server', ['browserify', 'express:dev']);

  grunt.registerTask('default', ['server']);

};