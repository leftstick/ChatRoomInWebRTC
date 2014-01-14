module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            dev: ['build']
        },
        concat: {
            dev: {
                files: {
                    'build/libs/all.js': ['src/js/Chat.js', 'src/js/*.js']
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/',
                    src: ['jquery/jquery.js', 'bootstrap/dist/js/bootstrap.js', 'angular/angular.js', 'angular-route/angular-route.js', 'peerjs/peer.js'],
                    dest: 'build/libs/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'bower_components/',
                    src: ['bootstrap/dist/fonts/*'],
                    dest: 'build/fonts/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'bower_components/',
                    src: ['bootstrap/dist/css/*.css', '!bootstrap/dist/css/*.min.css'],
                    dest: 'build/css/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*', '!**/*.tpl'],
                    dest: 'build/'
                }]
            }
        },
        template: {
            dev: {
                options: {
                    data: {
                        scripts: ['libs/jquery.js', 'libs/bootstrap.js', 'libs/angular.js', 'libs/angular-route.js', 'libs/peer.js', 'libs/all.js'],
                        csss: ['css/bootstrap.css', 'css/bootstrap-theme.css', 'css/Chat.css']
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.tpl'],
                    dest: 'build/',
                    ext: '.html'
                }]
            }
        },
        watch: {
            dev: {
                files: ['src/**/*'],
                tasks: ['clean:dev', 'concat:dev', 'copy:dev', 'template:dev'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 9898,
                    base: 'build/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['clean:dev', 'concat:dev', 'copy:dev', 'template:dev', 'connect:dev', 'watch:dev']);
};