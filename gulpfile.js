var
  gulp  = require('gulp'),
  scopackage = require('./lib/index.js');

gulp.task('default', function(done) {
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
    done();
  })
});

gulp.task('scorm2004', function(done) {
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
    console.log(msg);
    done();
  })
});

gulp.task('scorm20043rdEdition', function(done) {
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
    console.log(msg);
    done();
  })
});