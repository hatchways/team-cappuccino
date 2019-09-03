const express = require('express');
const router = express.Router();
const ListController = require('../controllers/list');
const UserController = require('../controllers/user');
const authMiddleWare = require('../middleware/auth-middleware');



// @route POST /api/lists
router.post("/lists/new/:userId", authMiddleWare, ListController.createList);

// @route GET /api/lists
router.get('/lists/by/:userId', authMiddleWare, ListController.getAllLists);

// @route GET /api/lists/:id
router.get('/lists/:listId', authMiddleWare, ListController.getSingleList);

// @route PATCH /api/lists/:id
router.put('/lists/:listId', authMiddleWare, ListController.updateList);

// @route DELETE /api/lists:id
router.delete('/lists/:listId', authMiddleWare, ListController.deleteList);

// @route POST /api/lists:id
router.post('/lists/uploadimage', authMiddleWare, ListController.uploadListImage);

// @route param userId
router.param("userId", UserController.userById);

// @route param listId
router.param("listId", ListController.listById);
module.exports = router;
