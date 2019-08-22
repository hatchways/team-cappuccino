const List = require("../models/list");
const User = require("../models/user");
const updateObj = require("./subs-controller/edit-model");
const upload = require("../services/image-upload");
const singleUpload = upload.single("image");

// create list
exports.createList = async (req, res) => {
  const list = new List({
    ...req.body,
    user: req.user._id
  });

  try {
    // save list and update user model
    await list.save();
    // return list
    res.status(201).send(list);
  } catch (e) {
    res.status(500).send(e);
  }
};

// get users lists
exports.getAllLists = async (req, res) => {
  try {
    await req.user.populate("list").execPopulate();

    res.send(req.user.list);
  } catch (e) {
    res.status(500).send(e);
  }
};

// get single list
exports.getSingleList = async (req, res) => {
  try {
    // get list id
    const _id = req.params.id;
    // find list
    const list = await List.findOne({ _id, user: req.user._id });
    // check if list is available
    if (!list)
      res.status(400).send({
        error: "List is not found!"
      });
    res.send(list);
  } catch (e) {
    res.status(500).send(e);
  }
};

// edit list
exports.updateList = async (req, res) => {
  try {
    const _id = req.params.id;

    const list = await List.findOne({ _id, user: req.user._id });
    // check if list is available
    if (!list)
      res.status(401).send({
        error: "List is not found!"
      });
    // update list
    updateObj(list, req.body, ["name"]);

    await list.save();

    if (!list)
      res.status(400).send({
        error: "List is not found!"
      });
    // return list
    res.status(201).json(list);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

// delete list
exports.deleteList = async (req, res) => {
  try {
    const _id = req.params.id;
    // find list
    const list = await List.findOne({ _id, user: req.user._id });
    // check if list is available
    if (!list)
      res.status(401).send({
        error: "List is not found!"
      });
    list.remove(); // list remove()

    if (!list) res.status(404).send({ error: "List is not found!" });

    // return list
    res.send(list);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

// uploading image for list
exports.uploadListImage = async (req, res) => {
  try {
    const _id = req.params.id;

    singleUpload(req, res, async function(err) {
      if (err) res.status(400).json({ error: err });

      // update User image
      const list = await List.findOne({ _id, user: req.user._id });
      // check if list is available
      if (!list)
        res.status(401).send({
          error: "List is not found!"
        });
      // upload image
      list.image = req.file.location;
      list.save(); // save user
      res.status(200).json(list);
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
