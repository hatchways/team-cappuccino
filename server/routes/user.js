const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const authMiddleware = require('../middleware/auth-middleware');

// @route GET users
router.get('', UserController.getAllUsers);

// @route GET users/me/:id
router.get('/me/:id', authMiddleware, UserController.getUser);

// @route PATCH users/me/:id
router.patch('/me/:id', authMiddleware, UserController.updateUser);

// @route DELETE users/me
router.delete('/me', authMiddleware, UserController.deleteUser);

// @route POST users/me/avatar
router.post('/me/:id/avatar', authMiddleware, UserController.uploadAvatar);

module.exports = router;







































 






