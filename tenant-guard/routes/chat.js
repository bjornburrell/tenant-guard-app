const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');


// Path: /chat 
router.get('/', chatController.getChat)

module.exports = router;
