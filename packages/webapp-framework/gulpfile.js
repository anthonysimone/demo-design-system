'use strict';

const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sassdoc = require('sassdoc');
const concat = require('gulp-concat');

/**
 * Compile the sassdoc project (this will blow away the custom css)
 */
gulp.task('sassdoc:compile', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sassdoc());
});

/**
 * Compile the custom theme
 */
gulp.task('sassdoc:sass', function () {
  return gulp.src('./scss/custom-theme/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./sassdoc-custom-theme/css'));
});

/**
 * Concatenate the default theme css with the custom theme css
 */
gulp.task('sassdoc:concat', function() {
  return gulp.src(['./sassdoc/assets/css/main.css', './sassdoc-custom-theme/css/sassdoc-theme.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./sassdoc/assets/css/'));
});

/**
 * Recompile sassdoc as well as regenerating the compiled css with custom theme
 */
gulp.task('sassdoc', gulp.series(['sassdoc:compile', 'sassdoc:sass', 'sassdoc:concat']));

/**
 * Watch the entire sassdoc project and recompile when necessary
 */
gulp.task('sassdoc:watch', function () {
  return gulp.watch('./scss/**/*.scss', gulp.series('sassdoc'));
});

gulp.task('default', gulp.series('sassdoc:watch'));