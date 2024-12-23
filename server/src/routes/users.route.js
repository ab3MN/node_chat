const express = require('express');

const { usersControllers } = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersControllers.getUsers);
router.post('/', usersControllers.createUser);

module.exports = { usersRouter: router };
