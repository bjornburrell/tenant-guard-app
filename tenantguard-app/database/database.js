
const CREATE_IP_TABLE_STRING = `CREATE TABLE IF NOT EXISTS ip_table (ip_id INT AUTO_INCREMENT PRIMARY KEY, ip_address VARCHAR(255), timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

// Create a new database within database directory
function createDatabase(db_name) {
  const db = require('better-sqlite3')('./database/chat.db', {});
  return db;
}

function createIPTable(db) {
  try {
    db.prepare(CREATE_IP_TABLE_STRING).run();
  } catch(err) {
    console.log('Error creating IP Table');
    console.log(err);
  }
}

function insertIP(db, ip) {
  try {
    const insertIP = db.prepare('INSERT INTO ip_table (ip_address) VALUES (?)');
    insertIP.run(ip);
  } catch(err) {
    console.log('Error inserting IP');
    console.log(err);
  }
}

function isIPInTable(db, ip) {
  try {
    const checkIP = db.prepare('SELECT * FROM ip_table WHERE ip_address = ?');
    const ipInTable = checkIP.get(ip);
    if(ipInTable) {
      return true;
    } else {
      return false;
    }
  } catch(err) {
    console.log('Error checking IP');
    console.log(err);
  }
}

function getTimestamp(db, ip) {
  try {
    const getTimestamp = db.prepare('SELECT timestamp FROM ip_table WHERE ip_address = ?');
    const timestamp = getTimestamp.get(ip);
    return timestamp;
  } catch(err) {
    console.log('Error getting timestamp');
    console.log(err);
  }
}

function isOverTimeDiff(timestamp, currentTime, maxTimeDiff) {
  const timeDiff = Math.abs(currentTime - timestamp);
  if(timeDiff > maxTimeDiff) {
    return true;
  } else {
    return false;
  }
}

function updateTimestamp(db, ip) {
  try {
    const updateTimestamp = db.prepare('UPDATE ip_table SET timestamp = CURRENT_TIMESTAMP WHERE ip_address = ?');
    updateTimestamp.run(ip);
  } catch(err) {
    console.log('Error updating timestamp');
    console.log(err);
  }
}
module.exports = { createDatabase, createIPTable, insertIP, isIPInTable, getTimestamp, isOverTimeDiff, updateTimestamp};
