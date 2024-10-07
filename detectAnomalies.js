const fs = require('fs');
const path = require('path');

const checkIPRanges = require('./anomChecks/checkIPRanges');
const checkUserLocation = require('./anomChecks/checkLocations')
const checkServiceUsed = require('./anomChecks/checkServiceUsed');
const checkCritResourceAccess = require('./anomChecks/checkCritResourceAccess');

function readJsonFile(fileNumber) {
  const filePath = path.join(__dirname, 'cloudtrail_logs', `cloudtrail_log_${fileNumber}.json`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Unable to read file:', err);
      return;
    }
    const jsonData = JSON.parse(data);
    
    const ipAnomalies = checkIPRanges(jsonData.Records);
    const userLocation = checkUserLocation(jsonData.Records);
    const serviceUsed = checkServiceUsed(jsonData.Records);
    const critResouceAccessed = checkCritResourceAccess(jsonData.Records);
    generateReport(fileNumber, ipAnomalies, userLocation, serviceUsed, critResouceAccessed);
  });
}

function generateReport(fileNumber, ipAnomalies, userLocation, serviceUsed, critResouceAccessed) {
  const report = {
    Out_of_Range_IP: ipAnomalies,
    Outside_of_US_or_IRE: userLocation,
    Unapproved_Service_Use: serviceUsed,
    Critical_Resource_Accessed: critResouceAccessed
  };
  fs.writeFile(`report${fileNumber}.json`, JSON.stringify(report, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Unable to write report:', err);
      return;
    }
    console.log(`Report generated: report${fileNumber}.json`);
  });
}


readJsonFile(1);
readJsonFile(2);
readJsonFile(3);

// readJsonFile(4);
// readJsonFile(5);
// readJsonFile(6);
// readJsonFile(7);
// readJsonFile(8);
// readJsonFile(9);
// readJsonFile(10);