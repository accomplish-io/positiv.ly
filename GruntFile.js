module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

     shell: {
         multiple: {
             command: [
                'npm install',
                'cd client',
                'bower install',
                'cd ..',
                'nodemon server/server.js'
             ].join('&&')
         }
     },


    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      app: {
        files: {
          'dist/<%= pkg.name %>.ng.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['client/app/GoalFactory.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-ng-annotate');
  // grunt.loadNpmTasks('grunt-bower');
  // grunt.loadNpmTasks('grunt-npm-install');
  // grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['shell']);

};