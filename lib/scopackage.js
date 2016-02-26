var
  fs = require('fs'),
  fse = require('fs-extra'),
  path = require('path'),
  schema = require('./schema.js'),
  manifest = require('./manifest.js');

var getLocation = function(obj) {
  obj = schema.config(obj);

  return {
    src: obj.source,
    dest: path.join(obj.destination, 'Scorm' + obj.version)
  };
};

var scopackage = function(obj) {
  var
    location = getLocation(obj),
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
      manifestFile.write(manifest(obj));
      console.log('Done');
    }
  });
};

module.exports = scopackage;