const express = require('express');
const router = express.Router();
const ListController = require('../controllers/list');
const authMiddleware = require('../middleware/auth-middleware');


// @route POST /api/lists
router.post("/lists", ListController.createList);


module.exports = router;
