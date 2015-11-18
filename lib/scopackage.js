var
  fs = require('fs'),
  fse = require('fs-extra'),
  path = require('path'),
  archiver = require('archiver'),
  schema = require('./schema.js'),
  manifest = require('./manifest.js');

var scopackage = function(obj, zip) {
  obj = schema.config(obj);

  var
    dir = obj.path,
    newdir = 'Scorm' + obj.version,
    finalSco = path.join(dir, newdir),
    fileList = fs.readdirSync(dir);

  fse.emptyDir(finalSco, function(err) {
    if (!err) {
      fileList.forEach(function(file) {
        if (file !== newdir) {
          fse.copySync(path.join(dir, file), path.join(finalSco, file));
        }
      });
      var manifestFile = fse.createOutputStream(path.join(finalSco, 'imsmanifest.xml'));
      obj.path = finalSco;
      manifestFile.write(manifest(obj));
     console.log('Done');

      if (zip) {
        zipscopackage(finalSco);
      }
    }
  });
};

var zipscopackage = function(directory) {
  var
    output = fs.createWriteStream(path.join(directory, 'test.zip')),
    archive = archiver('zip');

  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    console.log(directory);
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);
  archive.bulk([
    {expand: true, cwd: directory, src: ['**'], dest: directory}
  ]);

  archive.finalize();
};

module.exports = scopackage;