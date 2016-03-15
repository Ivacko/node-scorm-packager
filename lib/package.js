var
  fs = require('fs'),
  fse = require('fs-extra'),
  path = require('path'),
  schema = require('./schema.js'),
  manifest = require('./manifest.js');

var _getLocation = function(obj) {
  obj = schema.config(obj);

  return {
    src: obj.source,
    dest: path.join(obj.destination, 'Scorm' + obj.version)
  };
};

var buildPackage = function(obj) {
  var schemaVersion;

  switch (obj.version) {
    case '1.2':
      schemaVersion = 'scorm12';
      break;
    case '2004 4th Edition':
      schemaVersion = 'scorm2004';
      break;
    case '2004 3th Edition':
      schemaVersion = 'scorm2004';
      break;
  }

  if (!schemaVersion) {
    console.log('Supported are only:\n1.2\n2004 3rd Edition\n2004 4th Edition');
    return;
  }

  var
    location = _getLocation(obj),
    fileList = fs.readdirSync(location.src);

  fse.emptyDir(location.dest, function(err) {
    if (!err) {
      fileList.forEach(function(file) {
        var srcFile = path.join(location.src, file);
        var destFile = path.join(location.dest, file);
        if (srcFile !== location.dest) {
          fse.copySync(srcFile, destFile);
        }
      });
      var manifestFile = fse.createOutputStream(path.join(location.dest, 'imsmanifest.xml'));
      manifestFile.write(manifest(schemaVersion, obj));
      console.log('Done');
    }
  });
};

module.exports = buildPackage;