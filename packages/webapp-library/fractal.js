'use strict';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
fractal.set('project.title', 'Mode Webapp Component Library');

/* Set other custom project metadata */
fractal.set('project.version', '0.0.1');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/src/components');

fractal.components.set('resources', {
  scss: {
    label: 'SCSS',
    match: ['**/*.scss']
  },
  other: {
    label: 'Other Assets',
    match: ['**/*', '!**/*.scss', '!**.css']
  }
});

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/src/docs');

/* Specify a directory of static assets */
fractal.web.set('static.path', __dirname + '/public');

/* Set the static HTML build destination */
fractal.web.set('builder.dest', __dirname + '/build');


/**
 * Custom theme overrides
 */
const mandelbrot = require('@frctl/mandelbrot');

// create a new instance with custom config options
const myCustomisedTheme = mandelbrot({
  skin: "green",
  styles: [
    "default",
    "/css/mode-theme.css"
  ],
  // Add the comments panel
  panels: [
    "html",
    "view",
    // "context",
    "info",
    "notes",
    "framework",
    "resources"
  ]
});

// specify a directory to hold the theme override templates
myCustomisedTheme.addLoadPath(__dirname + '/src/theme-overrides');

fractal.web.theme(myCustomisedTheme);

module.exports = fractal;