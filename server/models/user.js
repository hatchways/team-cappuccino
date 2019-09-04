const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const keys = require("../config/keys");
const List = require("./list");
const Item = require("./item");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: [4, "Too short, min is 4 characters"]
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    min: [4, "Too short, min is 4 characters"]
  },
  hashed_password: {
    type: String,
    required: true,
    min: [4, "Too short, min is 4 characters"]
  },
  salt: String,
  avatar: {
    type: String,
    default: ""
  },
  joined: {
    type: Date,
    default: Date.now
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  ],
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item"
    }
  ]
});

// list
userSchema.virtual("list", {
  ref: "List",
  localField: "_id",
  foreignField: "user"
});

// item
userSchema.virtual("item", {
  ref: "Item",
  localField: "_id",
  foreignField: "user"
});


userSchema
    .virtual("password")
    .set(function(password) {
        // create temporary variable called _password
        this._password = password;
        // generate a timestamp
        this.salt = uuidv1();
        // encryptPassword()
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });


userSchema.methods = {
  authenticate: function(inputPassword) {
    return this.encryptPassword(inputPassword) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (e) {
      return "";
    }
  },

  generateToken: function() {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, keys.TOKEN_SECRET, {
      expiresIn: "1h"
    });

    return token;
  }
};


// delete user lists when user is removed
userSchema.pre("remove", async function(next) {
  const user = this;

  await List.deleteMany({ user: user._id });
  await Item.deleteMany({ user: user._id });
  next(); // continue proceeding request
});



const User = mongoose.model("User", userSchema);
module.exports = User;
