const geoip = require('geoip-lite');

function checkUserLocation(records) {
  const allowedCountries = ['US', 'IE'];

  return records
    .filter(record => {
      const sourceIP = record.sourceIPAddress;
      const geo = geoip.lookup(sourceIP);
      return geo && !allowedCountries.includes(geo.country);
    })
    .map(record => ({
      priority: 'Medium',
      userIdentity: record.userIdentity,
      eventID: record.eventID,
      eventSource: record.eventSource,
      eventName: record.eventName,
      awsRegion: record.awsRegion,
      sourceIPAddress: record.sourceIPAddress
    }));
}

module.exports = checkUserLocation;
