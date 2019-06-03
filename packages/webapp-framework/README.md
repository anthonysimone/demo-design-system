# Webapp Framework

This is the sass framework that models pattern abstractions leveraged in webapp. We are using [Sassdoc](http://sassdoc.com/) as a static documentation generator to give a general overview of of the sass framework. Sassdoc creates a documentation site based on doc comments in the sass files. Check the Sassdoc docs for more details or look at existing examples.

@TODO: Add details about the structure and groupings of Sassdoc once that is decided.

This framework is leveraged by the webapp library project that creates a set of presentational components in plain HTML and sass that can be implemented within any framework or context.

## Running Sassdoc Locally

There are a handful of gulp tasks set up in the `gulpfile.js` of this project that can be used to run and update Sassdoc locally.

If you want to compile Sassdoc once, you can run the following:

```
gulp sassdoc
```

If you want to compile on changes, you can run the following:

```
gulp sassdoc:watch
```

Since Sassdoc is just a static site generator, if you simply want to view the project locally, there's no need to compile, just open the html file in your browser.
