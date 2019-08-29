const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

// @route POST user/register
router.post('/user/register', AuthController.register);

// @route POST user/signin
router.post('/user/login', AuthController.login);


module.exports = router;