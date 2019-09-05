const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const authMiddleware = require("../middleware/auth-middleware");

// @route GET api/users
router.get("/users", UserController.getAllUsers);

// @route GET user/:id
router.get("/user/:userId", authMiddleware, UserController.getUser);

// @route PATCH api/user/:id
router.patch("/user/:userId", authMiddleware, UserController.updateUser);

// @route DELETE api/user
router.delete("/user/:userId", authMiddleware, UserController.deleteUser);

// @route POST api/user/:id/avatar
router.post(
  "/user/:userId/avatar",
  authMiddleware,
  UserController.uploadAvatar
);

// @route PUT api/user/follow
router.put(
  "/user/follow",
  authMiddleware,
  UserController.addFollowing,
  UserController.addFollower
);

// @route PUT user/unfollow
router.put(
  "/user/unfollow",
  authMiddleware,
  UserController.removeFollowing,
  UserController.removeFollower
);

// @route GET api/user/:id/following
router.get(
  "/user/:userId/following",
  authMiddleware,
  UserController.getFollowing
);

// @route GET api/user/:id/suggested
router.get(
  "/user/:userId/suggested",
  authMiddleware,
  UserController.getSuggested
);

// @route param
router.param("userId", UserController.userById);

module.exports = router;
