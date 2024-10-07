function checkSensitiveResources(records) {
    return records
      .filter(record => {
        const isS3Bucket = record.eventSource === 's3.amazonaws.com' && record.requestParameters.bucketName && record.requestParameters.bucketName.startsWith('prod-');
        const isEC2Instance = record.eventSource === 'ec2.amazonaws.com' && record.requestParameters.tagSet && record.requestParameters.tagSet.some(tag => tag.key === 'Environment' && tag.value === 'Production');
        const isDeleteOrModify = ['DeleteBucket', 'DeleteObject', 'PutBucketAcl', 'PutBucketPolicy', 'TerminateInstances', 'StopInstances', 'ModifyInstanceAttribute'].includes(record.eventName);
        return (isS3Bucket || isEC2Instance) && isDeleteOrModify;
      })
      .map(record => ({
        prioity: 'High',
        userIdentity: record.userIdentity,
        eventID: record.eventID,
        eventSource: record.eventSource,
        eventName: record.eventName,
        awsRegion: record.awsRegion,
        sourceIPAddress: record.sourceIPAddress
      }));
  }
  
  module.exports = checkSensitiveResources;
  