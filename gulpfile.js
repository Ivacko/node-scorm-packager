var
  gulp  = require('gulp'),
  scopackage = require('./lib/scopackage.js');

gulp.task('default', function() {
  scopackage({
    version: 1.2,
    organization: 'Test Company',
    title: 'Test Course',
    identifier: '00',
    masteryScore: 80,
    startingPage: 'index.html',
    source: 'D:/BACKUP1/test/000000 - dynamo-client-1.2.2/Project development/dynamo',
    destination: 'D:/BACKUP1/test/000000 - dynamo-client-1.2.2/Project development/dynamo'
  })
});