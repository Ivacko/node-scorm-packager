## Documentation

Creates .zip packages for SCORM 1.2 and SCORM 2004.

## Initialization Options

1 - SCORM version  
2 - organization
3 - course path
4 - course title
5 - identifier (uses 0 and course title if left empty)
6 - mastery score (80 if left empty)
7 - starting page (uses index.html if left empty)

{
    version: Number,
    organization: String,
    title: String,
    identifier: String,
    masteryScore: Number,
    startingPage: String,
    path: String
}
