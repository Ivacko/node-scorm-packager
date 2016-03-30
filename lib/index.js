var
  fs = require('fs'),
  fse = require('fs-extra'),
  path = require('path'),
  files = require('./files.js'),
  schema = require('./schema.js'),

  manifest = require('./manifest.js');

var _getLocation = function(obj) {
  obj = schema.config(obj);

  return {
    src: obj.source,
    dest: path.join(obj.destination, 'Scorm' + obj.version)
  };
};

var buildPackage = function(obj, callback) {
  var
    schemaVersion,
    rootDir = path.dirname(fs.realpathSync(__filename)),
    definitionFiles;

  switch (obj.version) {
    case '1.2':
      schemaVersion = 'scorm12';
      definitionFiles = path.join(rootDir, 'schemas', 'definitionFiles', 'scorm12edition');
      break;
    case '2004 3rd Edition':
      schemaVersion = 'scorm2004';
      definitionFiles = path.join(rootDir, 'schemas', 'definitionFiles', 'scorm20043rdedition');
      break;
    case '2004 4th Edition':
      schemaVersion = 'scorm2004';
      definitionFiles = path.join(rootDir, 'schemas', 'definitionFiles', 'scorm20044thedition');
      break;
  }

  if (!schemaVersion) {
    callback('Supported versions:\n1.2\n2004 3rd Edition\n2004 4th Edition');
    return;
  }

  var
    location = _getLocation(obj),
    fileList = files(location.src);

  fse.emptyDir(location.dest, function(err) {
    if (err) return callback(err);

    fileList.forEach(function(file) {
      var srcFile = path.join(location.src, file);
      var destFile = path.join(location.dest, file);
      if (srcFile !== location.dest) {
        try {
          fse.copySync(srcFile, destFile);
          console.log('copied:', file);
        } catch (err) {
          console.log(err);
        }
      }
    });

    var manifestFile = fse.createOutputStream(path.join(location.dest, 'imsmanifest.xml'));
    manifestFile.write(manifest(schemaVersion, obj));
    console.log('created imsmanifest.xml');

    fse.copy(definitionFiles, location.dest, function (err) {
      if (err) return callback(err);
      console.log('copied schema', obj.version, 'definition files');
      callback('Done');
    });
  });
};

module.exports = buildPackage;