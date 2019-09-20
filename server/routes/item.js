const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const ItemControllers = require("../controllers/item");
const ListControllers = require("../controllers/list");

// @route POST /items/:listId
router.post("/items/new/:listId", authMiddleware, ItemControllers.addItem);

// @route GET /items/:itemId
router.get("/items/:itemId", authMiddleware, ItemControllers.getSingleItem);

// @route GET /items/:listId
router.get("/list/:listId/items", authMiddleware, ItemControllers.getAllItems);

// @route Get /items/:userId
router.get("/list/:userId", authMiddleware, ItemControllers.getAllUsersItems);

// @route DELETE /items/:itemId
router.delete("/items/:itemId", authMiddleware, ItemControllers.deleteItem);

// @route DELETE all items
router.delete("/:listId/items", authMiddleware, ItemControllers.deleteAllItems);

// @route GET /items/test
router.get("/items", ItemControllers.testingPrice);

// @route params listId
router.param("listId", ListControllers.listById);

// @route param itemId
router.param("itemId", ItemControllers.itemById);

module.exports = router;
