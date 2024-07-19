const constants = require('../util/constants');
const util = require('../util/util');

module.exports.getChat = (req, res) => {
  return res.status(200).render('chat.ejs', {siteTitle: 'TenantGuard Chat', path: '/chat', defaultBotMsg: constants.defaultBotMessage});
};
