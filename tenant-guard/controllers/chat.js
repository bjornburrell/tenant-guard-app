const logger = require("../logger.js");
const {isIPInTable, isOverTimeDiff, insertIP, createIPTable, createDatabase} = require('../database/database.js');

// Create chat IP database if it doesn't exist
db = createDatabase('chat.db');
createIPTable(db);

//    /chat     GET
module.exports.chatGet = (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  res.render('chat.ejs', {siteTitle: 'TenantGuard Chat'});
};

//    /chat     POST
module.exports.chatPost = async (req, res) => {
  const request_body = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(ip);
}