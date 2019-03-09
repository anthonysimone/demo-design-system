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
  '../../node_modules',
  makeIncludePath('node_modules/normalize.css/'),
  makeIncludePath('node_modules/@frctl/')
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
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});

/**
 * Fractal helper tasks, these can also be done via fractal cli alone
 * fractal cli equivalent: `fractal start --sync`
 * npm script: `npm run start`
 */
const fractal = require('./fractal.js');
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

gulp.task('fractal:start', function(){
  const server = fractal.web.server({
      sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
      logger.success(`Fractal server is now running at ${server.url}`);
  });
});

/**
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * fractal cli equivalent: `fractal build`
 * npm script: `npm run build`
 */
gulp.task('fractal:build', function(){
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
      logger.success('Fractal build completed!');
  });
});
