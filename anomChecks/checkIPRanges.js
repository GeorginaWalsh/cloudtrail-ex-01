const ip = require('ip');

function checkIPRanges(records) {
  const allowedRanges = [
    '192.168.1.0/24',
    '10.0.0.0/16'
  ];

  return records
    .filter(record => {
      const sourceIP = record.sourceIPAddress;
      return !allowedRanges.some(range => ip.cidrSubnet(range).contains(sourceIP));
    })
    .map(record => ({
      prioity: 'Medium',
      userIdentity: record.userIdentity,
      eventID: record.eventID,
      eventSource: record.eventSource,
      eventName: record.eventName,
      awsRegion: record.awsRegion,
      sourceIPAddress: record.sourceIPAddress
    }));
}

module.exports = checkIPRanges;
