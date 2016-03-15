## Documentation

Creates .zip packages for SCORM 1.2 and SCORM 2004.

## Initialization Options

1 - SCORM version  
2 - organization
3 - course title
4 - identifier (uses 0 and course title if left empty)
5 - mastery score (80 if left empty)
6 - starting page (uses index.html if left empty)
7 - path to source files
8 - path to where the scorm package should be stored

{
    version: String,
    organization: String,
    title: String,
    identifier: String,
    masteryScore: Number,
    startingPage: String,
    source: String,
    destination: String
}
