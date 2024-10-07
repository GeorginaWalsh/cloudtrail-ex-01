function checkServiceUsage(records) {
  const allowedServices = [
    'lambda.amazonaws.com',
    'dynamodb.amazonaws.com',
    's3.amazonaws.com',
    'monitoring.amazonaws.com',
    'secretsmanager.amazonaws.com',
    'ecs.amazonaws.com'
  ];

  return records
    .filter(record => !allowedServices.includes(record.eventSource))
    .map(record => ({
      priority: 'High',
      userIdentity: record.userIdentity,
      eventID: record.eventID,
      eventSource: record.eventSource,
      eventName: record.eventName,
      awsRegion: record.awsRegion,
      sourceIPAddress: record.sourceIPAddress
    }));
}

module.exports = checkServiceUsage;
