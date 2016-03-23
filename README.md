## Documentation

Creates SCORM package from source directory.

* Automatic .zip file creation is not implemented yet.

## Initialization Options

* `version` {String} Version of schema e.g. 1.2, 2004 4rd Edition
* `organization` {String} Company name
* `title` {String}
* `identifier` {String} Uses 0 and course title if left empty
* `masteryScore` {Number} Uses 80 if left empty
* `startingPage` {String} Uses index.html if left empty
* `source` {String} The path to files from which the package will be created
* `destination` {String} The path to where the package will be created

## USAGE

```javascript
var scopackage = require('node-scorm-packager');

scopackage({
  version: '2004 4th Edition',
  organization: 'Test Company',
  title: 'Test Course',
  identifier: '00',
  masteryScore: 80,
  startingPage: 'index.html',
  source: 'path to your files',
  destination: 'path to where the package should be saved'
}, function(msg){
  console.log(msg);
});
```