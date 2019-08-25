const Item = require("../models/item");
const List = require("../models/list");
const User = require("../models/user");
const updateObj = require("./subs-controller/edit-model");

// get item id
exports.itemById = (req, res, next, id) => {
  Item.findById(id)
    .populate("user", "_id name")
    .populate("list", "_id name")
    .exec((err, item) => {
      if (err || !item) return res.status(400).json({ error: err });

      req.item = item;
      next();
    });
};

// adding item
exports.addItem = (req, res) => {
  const { name, url, list } = req.body;
  const item = new Item({
    name,
    url
  });

  try {
    List.findById(req.params.listId)
      .populate("items")
      .populate("user")
      .exec(async function(err, foundList) {
        if (err)
          return res.status(400).json({
            error: "Invalid data!"
          });

        foundList.items.push(item) // add to items
        // update item and user
        item.list = foundList;
        item.user = foundList.user;

        // save item
        await item.save();
        await foundList.save();

        res.json(foundList);
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

// getAllItems
exports.getAllItems = async (req, res) => {
  Item.find({ list: req.params.listId}).exec((err, items) => {
    if(err) return res.status(400).json({ error: err});

    return res.status(200).json(items);
  });
};

// get single item
exports.getSingleItem = async (req, res) => {
  return res.json(req.item);
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const _id = req.params.id;

    const item = await Item.findOne({ _id, user: req.user._id });

    // update list
    updateObj(item, req.body, ["name", "url"]);

    // save item
    await item.save();

    if (!item)
      res.status(400).send({
        error: "Item is not found!"
      });
    // return list
    res.status(201).json({ message: "Item is updated" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  const _id = req.params.id;

  try {
    await Item.findOne({ _id, user: req.user._id })
      .populate("list")
      .populate("user")
      .exec(async (err, result) => {
        if (err) return res.status(400).json({ error: err });

        if (!result) res.status(400).send({ error: "Item is not found!" });

        // upate List and User
        List.findByIdAndUpdate(result.list, { $unset: { items: _id } });
        ``;
        User.findByIdAndUpdate(result.user, { $unset: { items: _id } });

        // remove item
        result.remove();
        res.status(200).send({ message: "Item is removed!" });
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
