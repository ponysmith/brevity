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
        jasmine: {
            brevity: {
                src: 'js/brevity.js',
                options: {
                    specs: 'specs/*_spec.js',
                    vendor: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
                    ],                
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    
    grunt.registerTask('default', ['uglify','jasmine']);
}
