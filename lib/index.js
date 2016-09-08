var
  fs = require('fs'),
  fse = require('fs-extra'),
  path = require('path'),
  files = require('./files.js'),
  schema = require('./schema.js'),

  manifest = require('./manifest.js');

var _logSuccess = function (msg) {
  var date = new Date;
  var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  console.log('[' + time + ']', 'Created', "'" + '\x1b[32m' + msg + '\x1b[0m' + "'");
};

var _logError = function (err) {
  var date = new Date;
  var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  console.log('[' + time + ']' + '\x1b[31m', err, '\x1b[0m');
};

var buildPackage = function(obj, callback) {
  var
    schemaVersion,
    schemaDefinition;

  switch (obj.version) {
    case '1.2':
      schemaVersion = 'scorm12';
      schemaDefinition = 'scorm12edition';
      break;
    case '2004 3rd Edition':
      schemaVersion = 'scorm2004';
      schemaDefinition = 'scorm20043rdedition';
      break;
    case '2004 4th Edition':
      schemaVersion = 'scorm2004';
      schemaDefinition = 'scorm20044thedition';
      break;
  }

  if (!schemaVersion) {
    callback('Supported versions:\n1.2\n2004 3rd Edition\n2004 4th Edition');
    return;
  }

  var
    rootDir = path.dirname(fs.realpathSync(__filename)),
    destination = path.join(obj.destination, 'Scorm' + obj.version),
    fileList = files(obj.source).map(function (file) {
      return {
        name: file,
        source: path.join(obj.source, file),
        destination: path.join(destination, file)
      }
    }),
    definitionFileList = files(path.join(rootDir, 'schemas', 'definitionFiles', schemaDefinition))
      .map(function (file) {
        return {
          name: file,
          source: path.join(rootDir, 'schemas', 'definitionFiles', schemaDefinition, file),
          destination: path.join(destination, file)
        }
      });

  fse.emptyDir(destination, function(err) {
    if (err) return callback(err);

    fileList.forEach(function(file) {
      if (file.source !== file.destination) {
        try {
          fse.copySync(file.source, file.destination);
          _logSuccess(file.destination);
        } catch (err) {
          _logError(err);
        }
      }
    });

     manifestFile.write(manifest(schemaVersion, obj), function(err) {
      if (err) _logError(err);

      _logSuccess(path.join(destination, 'imsmanifest.xml'));

      definitionFileList.forEach(function(file) {
        try {
          fse.copySync(file.source, file.destination);
          _logSuccess(file.destination);
        } catch (err) {
          _logError(err);
        }
      });

      callback('Done');

    });
     
  });
};

module.exports = buildPackage;