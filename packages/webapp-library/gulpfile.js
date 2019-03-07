'use strict';
 
let fs = require('fs');
let gulp = require('gulp');
let sass = require('gulp-sass');
sass.compiler = require('node-sass');
let sourcemaps = require('gulp-sourcemaps');
// our custom design system package
let frameworkPaths = require('@asimone/webapp-framework').includePaths;
// other custom tool paths
let neatPaths = require('node-neat').includePaths;

/**
 * Helper function to account for manual include paths in mono repo
 * @param {string} path - the path to the necessary package dir path to add within node_modules
 */
function makeIncludePath(path) {
  return fs.existsSync(path) ? path : '../../' + path;
}

// Manually defined include paths for assets that aren't configured to be supported like the above packages
let includePaths = [
  makeIncludePath('node_modules/normalize.css/')
];

// Add any defined paths
includePaths = includePaths
                  .concat(neatPaths)
                  .concat(frameworkPaths);
 
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: includePaths
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});
