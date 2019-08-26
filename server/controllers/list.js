const List = require("../models/list");
const User = require("../models/user");
const updateObj = require('./subs-controller/edit-model');
const upload = require("../services/image-upload");
const singleUpload = upload.single("listimage");

// lists by id
exports.listById = (req, res, next, id) => {
  List.findById(id)
    .populate("user", "_id name")
    .exec((err, list) => {
      if (err || !list) return res.status(400).json({ error: err });

      req.list = list;
      next();
    });
};
// create list
exports.createList = async (req, res) => {
  const list = new List({
    ...req.body,
    user: req.params.userId
  });

  try {
    await list.save();
    res.status(201).send(list);
  }catch(e) {
    res.status(400).send({ error: e});
  }
};

// get users lists
exports.getAllLists = (req, res) => {
  List.find({ user: req.profile._id }).exec((err, lists) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.json(lists);
  });
};

// get single list
exports.getSingleList = async (req, res) => {
  return res.json(req.post);
};

// edit list
exports.updateList = async (req, res) => {
  try {
    const _id = req.params.listId; // get list id

    const list = await List.findOne({ _id, user: req.profile._id });

    // check list
    if(!list) return res.status(400).send({ error: 'List is not found!'});

    // updating list and save it 
    updateObj(list, req.body, ["title"]);
    list.save(); 

    res.status(200).json(list);

  }catch(e) {
    res.status(400).json({ error: e });
  }
};

// delete list
exports.deleteList = (req, res) => {
  List.findById(req.params.listId).exec((err, list) => {
    if(err) return res.status(400).json({ error: err });
    // remove list
    list.remove();
    return res.status(200).json({ message: 'List is deleted!~' });
  });
};

// uploading image for list
exports.uploadListImage = async (req, res) => {
  try {
    singleUpload(req, res, async function(err) {
      if (err)
        return res.status(400).send({
          errors: [{ title: "Image Upload Error", detail: err.message }]
        });

      return res.json({ listImageUrl: req.file.location });
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
