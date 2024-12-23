const express = require('express');

const { messagesControllers } = require('../controllers/messages.controller');

const router = express.Router();

router.get('/', messagesControllers.getMessagesByRoom);
router.post('/', messagesControllers.createMessage);

module.exports = { messagesRouter: router };
