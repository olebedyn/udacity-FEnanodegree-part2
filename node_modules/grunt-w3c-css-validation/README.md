# grunt-w3c-css-validation

> CSS Validation using W3C Validation Service

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-w3c-css-validation --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-w3c-css-validation');
```

## The "w3c_css_validation" task

### Overview
In your project's Gruntfile, add a section named `w3c_css_validation` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  w3c_css_validation: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

* `logfile` - the filepath to the log file. `false` to deactivate logfile. Default is `w3c_css_validation.json` 

Options from w3c-css: 
(see https://raw.githubusercontent.com/gchudnov/w3c-css/master/README.md)

* `uri` || `url` - the URL of the document to validate
* `text` - CSS document or fragment to validate. Only CSS-content is allowed
* `profile` - the CSS profile used for the validation: `css1, css2, css21, css3` [default: 'css3']
* `usermedium` - the [medium](http://www.w3.org/TR/CSS2/media.html) used for the validation: `screen, print, ...` [default: 'all', which is suitable for all devices]
* `warning` - the warning level, "no" for no warnings, 0 for less warnings, 1or 2 for more warnings [default: 2] 
* `server` - the "IP:PORT" string or the [URL object](https://nodejs.org/api/url.html) of a custom validation server, e.g, `'172.17.0.2:8080'` or `{ host: '172.17.0.2:8080' }`

### Output

## CSS Errors & Warnings
`errors` and `warnings` reported by the library are the arrays of following objects:

```javascript
{
  line: '...',      // refers to the line where the error or warning was detected
  message: '...'    // the error or warning message

  // additional properties:
  errorType: '...', // type of the error
  context: '...',   // context of the error
  level: '...',     // the level of the warning
  uri: '...'        // URL of the stylesheet
}
```

### Usage Examples

```js
grunt.initConfig({
  w3c_css_validation: {
    target: {
      options: {
        logfile: './tmp/w3c_css_validation.json',
      },
      src: ['test/css/*.css'],
    }
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 initial version