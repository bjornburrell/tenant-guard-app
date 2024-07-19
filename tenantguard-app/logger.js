const fs = require('fs');

// Create a logger function that writes to a file
function logger(message) {
  currentTime = new Date();
  message = currentTime + " " + message + "\n";
  fs.appendFile('log.txt', message, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = logger;