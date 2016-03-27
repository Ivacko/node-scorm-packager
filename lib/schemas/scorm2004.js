module.exports = function (obj) {
  var
    identifier = obj.title.replace(/ /g, '.'),
    itemIdentifier = 'item_' + obj.identifier.replace(/ /g, ''),
    identifierref = 'resource_' + obj.identifier.replace(/ /g, ''),
    organization = obj.organization.replace(/ /g, '_');
  return {
    '@identifier': identifier,
    '@version': 1,
    '@xmlns:adlnav': 'http://www.adlnet.org/xsd/adlnav_v1p3',
    '@xmlns': 'http://www.imsglobal.org/xsd/imscp_v1p1',
    '@xmlns:adlseq': 'http://www.adlnet.org/xsd/adlseq_v1p3',
    '@xmlns:imsss': 'http://www.imsglobal.org/xsd/imsss',
    '@xmlns:adlcp': 'http://www.adlnet.org/xsd/adlcp_v1p3',
    '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    '@xsi:schemaLocation': 'http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd ' +
    'http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd ' +
    'http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd ' +
    'http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd ' +
    'http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd',
    metadata: {
      schema: 'ADL SCORM',
      schemaversion: obj.version
    },
    organizations: {
      '@default': organization,
      organization: {
        '@identifier': organization,
        title: obj.title,
        item: {
          '@identifier': itemIdentifier,
          '@identifierref': identifierref,
          title: obj.title,
          'imsss:sequencing': {
            'imsss:objectives': {
              'imsss:primaryObjective': {
                '@objectiveID': 'PRIMARYOBJ',
                '@satisfiedByMeasure': 'true',
                'imsss:minNormalizedMeasure': obj.masteryScore / 100
              }
            },
            'imsss:deliveryControls': {
              '@completionSetByContent': 'true',
              '@objectiveSetByContent': 'true'
            }
          }
        },
      'imsss:sequencing': {
        'imsss:controlMode': {
          '@choice': 'true',
          '@flow': 'true'
        }}
      }
    },
    resources: {
      resource: {
        '@identifier': identifierref,
        '@type': 'webcontent',
        '@href': obj.startingPage,
        '@adlcp:scormType': 'sco',
        file: obj.files
      }
    }
  }
};