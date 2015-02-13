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
    beforeEach(function () {
      input = JSON.parse(fs.readFileSync('spec/1/input_1.json', 'utf8'));
      template = JSON.parse(fs.readFileSync('spec/1/template_1.json', 'utf8'));
      expected = JSON.parse(fs.readFileSync('spec/1/expected_1.json', 'utf8'));
    });

    it('should transform correctly like given in the files', function() {
      var output = transformJson(input, template);
      expect(output).to.be.ok;

      expect(output).to.deep.equal(expected);
    });
  });

});
