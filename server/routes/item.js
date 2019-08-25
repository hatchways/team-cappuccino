const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const ItemControllers = require('../controllers/item');
const ListControllers = require('../controllers/list');


// @route POST /items/:listId
router.post('/items/:listId', authMiddleware, ItemControllers.addItem);

// @route GET /items/:listId
router.get('/items/:listId', authMiddleware, ItemControllers.getAllItems);

// @route PATCH /items/:itemId
router.put('/items/:itemId', authMiddleware, ItemControllers.updateItem);

// @route DELETE /items/:itemId
router.delete('/items/:itemId', authMiddleware, ItemControllers.deleteItem);

// @route params listId
router.param("listId", ListControllers.listById);

// @route param itemId
router.param("itemId", ItemControllers.itemById);

module.exports = router;