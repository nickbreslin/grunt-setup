module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
       
        jshint: grunt.file.readJSON('grunt/jshint.json')
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
 
    grunt.registerTask('default', ['jshint']);
};