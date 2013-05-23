/*
 * grunt-inline-css
 * https://github.com/jgallen23/grunt-inline-css
 *
 * Copyright (c) 2013 Greg Allen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var juice = require('juice');

  grunt.registerMultiTask('inlinecss', 'Takes an html file with css link and turns inline.  Great for emails.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    var done = this.async();
    var index = 0;
    var count = this.files.length;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var filepath = f.src.toString();
      if (typeof filepath !== 'string') {
        grunt.log.error('src must be a single string');
        return false;
      }

      if (!grunt.file.exists(filepath)) {
        grunt.log.error('Source file "' + filepath + '" not found.');
        return false;
      }

      var doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';

      juice(filepath,{ addDoctype: doctype } ,function(err, html) {

        if (err) {
          return grunt.log.error(err);
        }
        
        // //JSDOM strips out doctype so we need to add it back in
        // var doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
        // html = doctype + html;

        grunt.file.write(f.dest, html);
        grunt.log.writeln('File "' + f.dest + '" created.');


        index++;
        if (index === count) {
          done();
        }

      });

    });
  });

};
