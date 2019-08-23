const List = require("../models/list");
const User = require("../models/user");
const upload = require("../services/image-upload");
const singleUpload = upload.single("listimage");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash")

// lists by id
exports.listById = (req, res, next, id) => {
  List.findById(id)
    .populate("user", "_id name")
    .exec((err, list) => {
      if (err || post) return res.status(400).json({ error: err });
    });

  req.list = list;
  next();
};
// create list
exports.createList = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err)
      return res.status(400).json({ err: "Image could not be uploaded" });

    // define new list
    let list = new List(fields);

    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    list.user = req.profile;

    if (files.photo) {
      list.photo.data = fs.readFileSync(files.photo.path);
      list.photo.contentType = files.photo.type;
  }

    list.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      res.json(result);
    });
  });
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
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
      if (err) {
          return res.status(400).json({
              error: "Photo could not be uploaded"
          });
      }
      // save list
      let list = req.list;
      list = _.extend(list, fields);

      if (files.photo) {
          list.photo.data = fs.readFileSync(files.photo.path);
          list.photo.contentType = files.photo.type;
      }

      list.save((err, result) => {
          if (err) {
              return res.status(400).json({
                  error: err
              });
          }
          res.json(list);
      });
  });
};

// delete list
exports.deleteList = (req, res) => {
  let list = req.list;
  list.remove((err, post) => {
    if(err) return res.status(400).json({ error: err});
    // return success message
    res.json({ message: 'List is deleted successfully!'});
  })
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
