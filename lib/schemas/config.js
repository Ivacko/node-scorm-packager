var path = require('path');

module.exports = function (obj) {
  return {
    version: obj.version || '1.2',
    organization: obj.organization || '',
    title: obj.title || '',
    identifier: obj.identifier || 0,
    masteryScore: obj.masteryScore || 80,
    startingPage: obj.startingPage || 'index.html',
    source: obj.source ? path.normalize(obj.source) : path.normalize('./'),
    destination: obj.destination ? path.normalize(obj.destination) : path.normalize('./')
  };
};