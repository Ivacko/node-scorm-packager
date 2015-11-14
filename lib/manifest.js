var
  validate = require('jsonschema').validate,
  builder = require('xmlbuilder'),
  schema = require('./schema.js');

var manifest = function (obj) {
  var
    configObj = schema.config(obj);

  var xml = builder.create('manifest', {
    version: '1.0',
    encoding: 'utf-8',
    standalone: false
  })
    .ele(schema.scorm12(configObj))
    .end({ pretty: true});

  console.log(xml);
};

manifest({
  organization: 'Company name',
  title: 'Test Course'
});

module.exports = manifest;
