module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),      
        uglify: {
            dev: {
                files: {
                    'js/brevity.min.js': ['js/brevity.js']
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);

}
