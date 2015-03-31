module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            options: {
                urls: ['http://localhost:8000/test/index.html']
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'Starlight/www/js/*.js',
                '!Starlight/www/js/index.js',
                '!Starlight/www/js/build/',
                'test/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },
        uglify: {
            dist: {
                files: {
                    'Starlight/www/js/build/main.min.js' : [
                        'Starlight/www/js/*.js',
                    ]
                }
            }
        },
        clean: {
            dist: [
                'Starlight/www/js/build/main.min.js'
            ]
        },
        watch: {
            js: {
                files: [
                    '<%= jshint.all %>',
                    'Starlight/www/css/*.css',
                    'Starlight/www/templates/*',
                    'Starlight/www/templates/views/*',
                    'Starlight/www/templates/partials/*'
                ],
                tasks: ['jshint', 'exec']
            }
        },

        exec: {
          corvoda_run: 'cd Starlight && cordova run && cd ..'
        }

    });

    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');


    grunt.registerTask('default', ['jshint', 'connect', 'qunit']);
    grunt.registerTask('build', ['jshint', 'connect', 'qunit', 'clean', 'uglify', 'exec']);
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('ci', ['default']);
};