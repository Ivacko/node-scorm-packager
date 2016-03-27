var
  gulp  = require('gulp'),
  scopackage = require('./lib/index.js');

gulp.task('default', function() {
  scopackage({
    version: '1.2',
    organization: 'Test Company',
    title: 'Test Course',
    identifier: '00',
    masteryScore: 80,
    startingPage: 'index.html',
    source: 'test/mocks',
    destination: ''
  }, function(msg) {
    console.log(msg);
  })
});

gulp.task('scorm2004', function() {
  scopackage({
    version: '2004 4th Edition',
    organization: 'Test Company',
    title: 'Test Course',
    identifier: '00',
    masteryScore: 80,
    startingPage: 'index.html',
    source: 'test/mocks',
    destination: ''
  }, function(msg) {
    console.log(msg)
  })
});

gulp.task('scorm20043rdEdition', function() {
  scopackage({
    version: '2004 3rd Edition',
    organization: 'Test Company',
    title: 'Test Course',
    identifier: '00',
    masteryScore: 80,
    startingPage: 'index.html',
    source: 'test/mocks',
    destination: ''
  }, function(msg) {
    console.log(msg)
  })
});