var
  fs = require('fs'),
  fse = require('fs-extra'),
  path = require('path'),
  schema = require('./schema.js'),
  manifest = require('./manifest.js');

var scopackage = function(obj) {
  obj = schema.config(obj);

  var
    projectPath = obj.path,
    newdir = 'Scorm' + obj.version,
    finalSco = path.join(projectPath, newdir),
    fileList = fs.readdirSync(projectPath);

  fse.emptyDir(finalSco, function(err) {
    if (!err) {
      fse.copy('schemas', finalSco, function (err) {
        if (!err) {
          console.log('Done');
        }
      });

      /*fileList.forEach(function(file) {
        fse.copy('files.js', finalSco, function (err) {
          if (!err) {
            console.log('Done');
          }
        });
      });*/
      //var manifestFile = fse.createOutputStream(path.join(finalSco, 'imsmanifest.xml'));
      //manifestFile.write(manifest(obj));
    }
  });
};

scopackage({
  organization: 'Company name',
  title: 'Test Course'
});
