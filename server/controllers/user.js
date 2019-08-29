const User = require("../models/user");
const updateObj = require("./subs-controller/edit-model");
const upload = require("../services/image-upload");
const singleUpload = upload.single("image");

// get user info
exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, user) => {
      if (err || !user)
        return res.status(400).json({ error: "User is not found!" });
      // return user
      req.profile = user; 
      next();
    });
};

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

// get all users
exports.getAllUsers = async (req, res) => {
  User.find((err, users) => {
    if (err) return res.status(400).json({ error: err });
    res.json(users);
  }).select(" name email avatar joined");
};

// updating usera
exports.updateUser = (req, res) => {
  User.findById(req.profile._id).select("-hashed_password -salt").exec(async (err, user) => {
    if(err) return res.status(400).json({ error: err });

    // update user and save 
    updateObj(user, req.body, ["name", "email"]);
    await user.save();
    return res.status(200).json(user); // return user
  });
};

// delete user
exports.deleteUser = (req, res) => {
  User.findById(req.profile._id).exec((err, user) => {
    if (err) return res.status(400).json({ error: err });
    // remove user 
    user.remove();
    res.status(200).json({ message: 'Your account has been deleted!' });
  })
};

// upload user avatar
exports.uploadAvatar = (req, res) => {
  singleUpload(req, res, async function(err) {
    if (err)
      return res
        .status(400)
        .send({
          errors: [{ title: "Image Upload Error", detail: err.message }]
        });
    return res.json({ 'imageUrl': req.file.location });
  });
};

// following/unfollowing
exports.addFollowing = async (req, res, next) => {
  const { userId, followId } = req.body;

  try {
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { following: followId } },
      (err, result) => {
        if (err) return res.status(400).json({ error: err });

        next(); // move to next actions
      }
    );
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

exports.removeFollowing = async (req, res, next) => {
  const { userId, unfollowId } = req.body;

  try {
    await User.findByIdAndUpdate(
      userId,
      { $unset: { following: unfollowId } },
      (err, result) => {
        if (err) return res.status(400).json({ error: err });

        next(); // move to next actions
      }
    );
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// add/remove followers
exports.addFollower = async (req, res) => {
  const { userId, followId } = req.body;

  try {
    await User.findByIdAndUpdate(
      followId,
      { $addToSet: { followers: userId } },
      { new: true }
    )
      .populate("following", "_id name email")
      .populate("followers", "_id name email")
      .exec(async (err, result) => {
        if (err) return res.status(400).json({ error: err });

        res.status(200).json({
          message: "Add following and followers successfully!"
        });
      });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.removeFollower = async (req, res) => {
  const { userId, unfollowId } = req.body;

  try {
    await User.findByIdAndUpdate(
      unfollowId,
      { $unset: { followers: userId } },
      { new: true }
    )
      .populate("following", "_id name email")
      .populate("followers", "_id name email")
      .exec(async (err, result) => {
        if (err) return res.status(400).json({ error: err });

        res.status(200).json({
          message: "Remove following and followers successfully!"
        });
      });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
