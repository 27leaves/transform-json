var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;

var transformJson = require(path.join(__dirname, '..', './transform-json.js'));

describe('transformJson()', function () {
  'use strict';

  it('exists', function () {
    expect(transformJson).to.be.a('function');
  });

  describe('basic functionality', function() {
    var input, template, expected;

    it('should transform correctly like given in the files', function() {
      input = JSON.parse(fs.readFileSync('spec/1/input.json', 'utf8'));
      template = JSON.parse(fs.readFileSync('spec/1/template.json', 'utf8'));
      expected = JSON.parse(fs.readFileSync('spec/1/expected.json', 'utf8'));

      var output = transformJson(input, template);
      expect(output).to.be.ok;

      expect(output).to.deep.equal(expected);
    });


    it('should also get dot-notation-keys in objects', function() {
      input = JSON.parse(fs.readFileSync('spec/2/input.json', 'utf8'));
      template = JSON.parse(fs.readFileSync('spec/2/template.json', 'utf8'));
      expected = JSON.parse(fs.readFileSync('spec/2/expected.json', 'utf8'));

      var output = transformJson(input, template);
      expect(output).to.be.ok;

      expect(output).to.deep.equal(expected);
    });
  });

});
