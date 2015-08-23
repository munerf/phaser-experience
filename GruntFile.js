module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                 {
                    cwd: 'src',
                    src: [ '**' ],
                    dest: 'build',
                    expand: true
                }
                ]
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './build'
                }
            }
        }, 
        watch: {
            files: ['src/**/*.js', 'src/**/*.html'],
            tasks: ['copy']
        },
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        }
    });

    grunt.registerTask('default', ['copy', 'connect', 'open', 'watch']);

}