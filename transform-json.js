/*! transform-json v0.0.0 - MIT license */
'use strict';

var _ = require('lodash');

var transformJson = function (input, template) {
  var output = _.cloneDeep(input);

  var getPath = function (obj, path) {
    if(!obj) {
      return undefined;
    }
    else if(obj[path]) {
      return obj[path];
    }
    else if(path.indexOf('.') > -1) {
      var index = path.indexOf('.');
      var key = path.substr(0,index);
      var rest = path.substr(index+1);
      return (getPath(obj[key], rest));
    }
    else {
      return undefined;
    }
  };

  var deleteFromPath = function (obj, path) {
    if(obj[path]) {
      delete obj[path];
    }
    else if(path.indexOf('.') > -1) {
      var index = path.indexOf('.');
      var key = path.substr(0,index);
      var rest = path.substr(index+1);
      deleteFromPath(obj[key], rest);
      if(_.size(obj[key]) === 0) {
        delete obj[key];
      }
    }
  };

  var setInPath = function (obj, path, insert) {
    if(path.indexOf('.') > -1) {
      var index = path.indexOf('.');
      var key = path.substr(0,index);
      var rest = path.substr(index+1);
      if(!obj[key]) {
        obj[key] = {};
      }
      setInPath(obj[key], rest);
    }
    else {
      obj[path] = insert;
    }
  };

  for(key in template) {
    var templateItem = template[key];

    // get current value
    var curValue = getPath(input, key);
    if(!curValue) {
      console.log('warning: path "' + key + '" not defined');
    }

    // delete from structure
    deleteFromPath(output, key);

    // fill new values
    if(_.isArray(templateItem)) {
      templateItem.forEach(function ( newKey ) {
        setInPath(output, newKey, curValue);
      });
    }
    else if (_.isString(templateItem)) {
      setInPath(output, templateItem, curValue);
    }
  };

  return output;
};


if ( typeof module !== "undefined" ) {
  module.exports = transformJson;
}
