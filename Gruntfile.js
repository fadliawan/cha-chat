module.exports = function(grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({

    'browserify': {
      'app/public/main.js': 'app/public/client.js'
    },

    'express': {
      options: {
        background: true
      },
      dev: {
        options: {
          script: 'app/chat-server.js'
        }
      }
    },

    'watch': {
      express: {
        files: ['app/public/*.js'],
        tasks: ['browserify'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.registerTask('server', [
    'browserify',
    'express:dev',
    'watch'
  ]);

  grunt.registerTask('default', ['server']);

};