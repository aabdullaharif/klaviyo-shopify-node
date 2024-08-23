const fs = require('fs');
const path = require('path');

// Ensure the logs directory exists
const logsDir = path.join(__dirname, '..', '..', 'logs');

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Function to append logs to the file
const appendLogToFile = (logFileName, message) => {
    // Define the log file path
    const logFilePath = path.join(logsDir, logFileName);

    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFilePath, `${timestamp} - ${message}\n`, 'utf8');
};

module.exports = appendLogToFile;