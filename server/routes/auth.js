const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

// @route POST user/register
router.post('/register', AuthController.register);

// @route POST user/signin
router.post('/login', AuthController.login);

// // @route POST user/logout 
// router.post('/logout', authMiddleware, AuthController.logout);''

module.exports = router;