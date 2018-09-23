'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    scss = require('gulp-scss'),
    compass = require('gulp-compass'),    
    livereload = require('gulp-livereload');

gulp.task('styles', function() {
  return gulp.src(['./sass/style.scss'])
    .pipe(compass({
      css: 'css',
      sass: 'sass'
    }))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

//Gulp Watch
gulp.task('watch', function() {

  // Create LiveReload server
  livereload.listen();

  // Watch .scss files
  gulp.watch('sass/**/*.scss', ['default']);
});


gulp.task('default', ['styles','watch']);