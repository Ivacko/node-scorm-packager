module.exports = function (obj) {
  var identifier = obj.identifier + '_' + obj.title.split(' ').join('_');
  return {
    '@xmlns:adlcp': 'http://www.adlnet.org/xsd/adlcp_rootv1p2',
    '@xmlns': 'http://www.imsproject.org/xsd/imscp_rootv1p1p2',
    '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    '@identifier': obj.title,
    '@version': 1,
    '@xsi:schemaLocation': 'http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd ' +
    'http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd ' +
    'http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd',
    metadata: {
      schema: 'ADL SCORM',
      schemaversion: obj.version
    },
    organizations: {
      '@default': obj.organization,
      organization: {
        '@identifier': obj.organization,
        title: obj.title,
        item: {
          '@identifier': 'I_' + identifier,
          '@identifierref': identifier,
          title: obj.title,
          'adlcp:masteryscore': obj.masteryScore
        }
      }
    },
    resources: {
      resource: {
        '@identifier': identifier,
        '@type': 'webcontent',
        '@href': obj.startingPage,
        '@adlcp:scormtype': 'sco',
        file: obj.files
      }
    }
  }
};