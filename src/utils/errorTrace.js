const fs = require('fs');
const path = require('path');

// Ensure the logs directory exists
const logsDir = path.join(__dirname, '..', '..', 'errors');

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Error handling function
function handleErrorTrace(logFileName, error) {
    console.error(`Error: [${logFileName}]`, error.response.status);
    recordError(logFileName, error);
}

// Function to record errors to a file
function recordError(logFileName, error) {
    // Define the log file path
    const logFilePath = path.join(logsDir, logFileName);

    const errorData = `${new Date().toISOString()}: ${error.stack}\n\n`;
    fs.appendFile(logFilePath, errorData, (err) => {
        if (err) {
            console.error('Error recording error:', err);
        }
    });
}

module.exports = handleErrorTrace;