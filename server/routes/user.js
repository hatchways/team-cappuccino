const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// @route POST user/register
router.post('/register', UserController.register);

// @route POST user/signin
router.post('/signin', UserController.signin);

module.exports = router;