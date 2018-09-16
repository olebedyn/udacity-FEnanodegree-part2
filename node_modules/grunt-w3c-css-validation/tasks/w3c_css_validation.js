/*
 * grunt-w3c-css-validation
 * https://github.com/knoblochtobias/grunt-w3c-css-validation
 *
 * Copyright (c) 2017 Tobias Knobloch
 * Licensed under the MIT license.
 */

'use strict';

var validator = require('w3c-css');
var extend = require('lodash.assign');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('w3c_css_validation', 'CSS Validation using W3C Validation Service', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      profile: 'css3',
      usermedium: 'all',
      logfile: 'w3c_css_validation_log.json',
    });
    var self = this;
    
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      
      // Concat specified files.
      var src = f.src.filter(function(filepath, index) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return {
          filepath: filepath,
          content: grunt.file.read(filepath),
        };
      });
      
      var srcLength = src.length;
      var logfilecontent = {};
      var done = self.async();
      src.forEach(function (srcFile, index) {
        var params = extend({ text: srcFile.content }, options);

        validator.validate(params, function (err, data) {
          if(err) {
            grunt.log.error(err);
          } else {
            var logMessage = 'File "' + srcFile.filepath + '" has ' + data.errors.length + ' errors and ' + data.warnings.length + ' warnings';
            if (data.errors.length > 0) {
              grunt.log.error(logMessage);
            } else if (data.warnings.length > 0) {
              grunt.log.warn(logMessage);
            } else {
              grunt.log.ok(logMessage);
            }

            grunt.log.debug(JSON.stringify(data.errors, null, 2));
            grunt.log.debug(JSON.stringify(data.warnings, null, 2));
            if (options.logfile) {
              logfilecontent[srcFile.filepath] = data;
            }
          }
          if (srcLength === Object.keys(logfilecontent).length) {
            if (options.logfile) {         
              grunt.file.write(options.logfile, JSON.stringify(logfilecontent, null, 2));
              grunt.log.ok('Saved logfile "' + options.logfile + '"');
            }
            done(true);
          }
        });
      });
    });
  });

};
