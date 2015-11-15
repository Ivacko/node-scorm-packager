var
  validate = require('jsonschema').validate,
  builder = require('xmlbuilder'),
  schema = require('./schema.js'),
  files = require('./files.js');

var manifest = function (obj) {
  var
    configObj = schema.config(obj);

  configObj.files = files(configObj.path);

  var xml = builder.create('manifest', {
    version: '1.0',
    encoding: 'utf-8',
    standalone: false
  })
    .ele(schema.scorm12(configObj))
    .end({ pretty: true});

return xml;
  //console.log(xml);
};

/*manifest({
  organization: 'Company name',
  title: 'Test Course'
});*/

module.exports = manifest;
