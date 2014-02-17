module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            all: ['build']
        },
        concat: {
            dev: {
                files: {
                    'build/libs/all.js': ['src/js/Chat.js', 'src/js/*.js']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'build/libs/all.min.js': ['src/js/Chat.js', 'src/js/*.js']
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'build/css/Chat.min.css': ['src/**/*.css']
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/',
                    src: ['underscore/underscore.js', 'jquery/jquery.js', 'bootstrap/dist/js/bootstrap.js', 'angular/angular.js', 'angular-route/angular-route.js', 'angular-strap/dist/angular-strap.js', 'angular-strap/dist/angular-strap.tpl.js', 'peerjs/peer.js'],
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
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/',
                    src: ['underscore/underscore-min.js', 'underscore/underscore-min.map', 'jquery/jquery.min.js', 'jquery/jquery.min.map', 'bootstrap/dist/js/bootstrap.min.js', 'angular/angular.min.js', 'angular/angular.min.js.map', 'angular-route/angular-route.min.js', 'angular-route/angular-route.min.js.map', 'angular-strap/dist/angular-strap.min.js', 'angular-strap/dist/angular-strap.min.map', 'angular-strap/dist/angular-strap.tpl.min.js', 'peerjs/peer.min.js'],
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
                    src: ['bootstrap/dist/css/*.min.css'],
                    dest: 'build/css/',
                    flatten: true
                }]
            }
        },
        template: {
            dev: {
                options: {
                    data: {
                        scripts: ['libs/underscore.js', 'libs/jquery.js', 'libs/bootstrap.js', 'libs/angular.js', 'libs/angular-route.js', 'libs/angular-strap.js', 'libs/angular-strap.tpl.js', 'libs/peer.js', 'libs/all.js'],
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
            },
            dist: {
                options: {
                    data: {
                        scripts: ['libs/underscore-min.js', 'libs/jquery.min.js', 'libs/bootstrap.min.js', 'libs/angular.min.js', 'libs/angular-route.min.js', 'libs/angular-strap.min.js', 'libs/angular-strap.tpl.min.js', 'libs/peer.min.js', 'libs/all.min.js'],
                        csss: ['css/bootstrap.min.css', 'css/bootstrap-theme.min.css', 'css/Chat.min.css']
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
                tasks: ['clean:all', 'concat:dev', 'copy:dev', 'template:dev'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 9898,
                    base: 'build/',
                    open: 'http://localhost:9898'
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['clean:all', 'concat:dev', 'copy:dev', 'template:dev', 'connect:dev', 'watch:dev']);

    grunt.registerTask('dist', ['clean:all', 'uglify:dist', 'cssmin:dist', 'copy:dist', 'template:dist']);
};