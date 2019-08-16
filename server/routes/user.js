const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const authMiddleware = require('../middleware/auth-middleware');

// @route GET api/users
router.get('/users', UserController.getAllUsers);

// @route GET api/user/:id
router.get('/user/:id', authMiddleware, UserController.getUser);

// @route PATCH api/user/:id
router.patch('/user/:id', authMiddleware, UserController.updateUser);

// @route DELETE api/user
router.delete('/user', authMiddleware, UserController.deleteUser);

// @route POST api/user/:id/avatar
router.post('/user/:id/avatar', authMiddleware, UserController.uploadAvatar);

// @route PUT api/user/follow
router.put(
    '/user/follow', 
    authMiddleware, 
    UserController.addFollowing,
    UserController.addFollower
);

// @route PUT user/unfollow
router.put(
    '/user/unfollow', 
    authMiddleware, 
    UserController.removeFollowing,
    UserController.removeFollower
)
module.exports = router;







































 






