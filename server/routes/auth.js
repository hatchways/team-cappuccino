const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth-middleware');

// @route POST user/register
router.post('/user/register', AuthController.register);

// @route POST user/signin
router.post('/user/login', AuthController.login);

// @route POST user/logout 
// router.post('/logout', authMiddleware, AuthController.logout);

module.exports = router;