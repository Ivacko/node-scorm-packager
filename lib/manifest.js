var
  validate = require('jsonschema').validate,
  builder = require('xmlbuilder'),
  path = require('path'),
  schema = require('./schema.js'),
  files = require('./files.js');

var manifest = function (obj) {
  var
    configObj = schema.config(obj),
    lisOfFiles = files(path.join(configObj.destination, 'Scorm' + obj.version));

  configObj.files = lisOfFiles.map(function(value){
    var rObj = {};
    rObj['@href'] = value;
    return rObj;
  });

  return builder.create('manifest', {
    version: '1.0',
    encoding: 'utf-8',
    standalone: false
  })
    .ele(schema.scorm12(configObj))
    .end({ pretty: true});
};

module.exports = manifest;