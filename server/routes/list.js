const express = require('express');
const router = express.Router();
const ListController = require('../controllers/list');
const authMiddleWare = require('../middleware/auth-middleware');


// @route POST /api/lists
router.post("/lists", authMiddleWare, ListController.createList);

// @route GET /api/lists
router.get('/lists', authMiddleWare, ListController.getAllLists);

// @route GET /api/lists/:id
router.get('/lists/:id', authMiddleWare, ListController.getSingleList);

// @route PATCH /api/lists/:id
router.patch('/lists/:id', authMiddleWare, ListController.updateList);

// @route DELETE /api/lists:id
router.delete('/lists/:id', authMiddleWare, ListController.deleteList);


module.exports = router;
