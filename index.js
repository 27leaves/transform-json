#!/usr/bin/env node
'use strict';

var opts = require("nomnom").parse();
var fs = require('fs');
var transformJson = require('./transform-json');

if(!opts.input) {
  return console.log('input has to be specified');
}
else if(!opts.output) {
  return console.log('output has to be specified');
}
else if(!opts.template) {
  return console.log('template has to be specified');
}
else {
  var inputFile = opts.input;
  var templateFile = opts.template;
  var outputFile = opts.output;
  fs.readFile(inputFile, 'utf8', function (err,input) {
    if (err) {
      return console.log(err);
    }
    // input is there
    var inputJSON = JSON.parse(input);

    fs.readFile(templateFile, 'utf8', function (err,template) {
      if (err) {
        return console.log(err);
      }
      // template is there
      var templateJSON = JSON.parse(template);
      var output = transformJson(inputJSON, templateJSON);

      fs.writeFile(outputFile, JSON.stringify(output, null, 2), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("File " + outputFile + " successfully saved.");
        }
      });

    });

  });
}
