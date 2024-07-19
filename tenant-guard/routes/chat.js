const express = require('express');
const chat = express.Router();
const path = require('path');
const chatController = require('../controllers/chat');

const rootDir = require('../util/rootdir');
chat.use(express.static(path.join(rootDir, 'public')));
//    /chat     GET
chat.get('/',chatController.chatGet); 

//    /chat     POST
chat.post('/', chatController.chatPost);

module.exports = chat;