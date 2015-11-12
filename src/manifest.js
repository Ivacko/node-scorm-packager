var
  validate = require('jsonschema').validate,
  builder = require('xmlbuilder'),
  scorm12 = require('./scorm12.js');

var manifest = function (obj) {
  var
    configObj = {
      version: obj.version || '1.2',
      organization: obj.organization || '',
      title: obj.title || '',
      identifier: obj.identifier || 0,
      masteryScore: obj.masteryScore || 80,
      startingPage: obj.startingPage || 'index.html'
    };

  var xml = builder.create('manifest', {
    version: '1.0',
    encoding: 'utf-8',
    standalone: false
  })
    .ele(scorm12(configObj))
    .end({ pretty: true});

  console.log(xml);
};

manifest({
  organization: 'Company name',
  title: 'Test Course'
});



module.exports = manifest;
