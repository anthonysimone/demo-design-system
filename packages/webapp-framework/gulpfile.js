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
function sassdocCompile() {
  return gulp.src('scss/**/*.scss')
    .pipe(sassdoc());
}
gulp.task('sassdoc:compile', sassdocCompile);

/**
 * Compile the custom theme
 */
function sassdocSass() {
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
}
gulp.task('sassdoc:sass', sassdocSass);

/**
 * Concatenate the default theme css with the custom theme css
 */
function sassdocConcat() {
  return gulp.src(['./sassdoc/assets/css/main.css', './sassdoc-custom-theme/css/sassdoc-theme.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./sassdoc/assets/css/'));
}
gulp.task('sassdoc:concat', sassdocConcat);

/**
 * Recompile sassdoc as well as regenerating the compiled css with custom theme
 */
function sassdocBuildSeries() {
  return gulp.series(sassdocCompile, sassdocSass, sassdocConcat);
}
gulp.task('sassdoc:build', sassdocBuildSeries());

/**
 * Watch the entire sassdoc project and recompile when necessary
 */
function sassdocWatch() {
  gulp.watch('./scss/**/*.scss', sassdocBuildSeries());
}
gulp.task('sassdoc:watch', sassdocWatch);

gulp.task('default', sassdocWatch);