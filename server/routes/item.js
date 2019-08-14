const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const ItemControllers = require('../controllers/item');


// @route POST /items
router.post('/items', authMiddleware, ItemControllers.addItem);

// @route GET /items
router.get('/items', authMiddleware, ItemControllers.getAllItems);

// @route PATCH /items/:id
router.patch('/items/:id', authMiddleware, ItemControllers.updateItem);

// @route DELETE /items/:id
router.delete('/items/:id', authMiddleware, ItemControllers.deleteItem);

module.exports = router;