const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const List = require('./list');
const Item = require('./item');



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: [4, 'Too short, min is 4 characters']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) throw new Error('Email is invalid!')
        },        
        min: [4, 'Too short, min is 4 characters']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: [4, 'Too short, min is 4 characters'],
        validate(value) {
            if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain "pasword". Plese try another one!')
        }
    },
    avatar: {
        type: String,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    following: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }],
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
},
{
    timestamps: true
});


// list
userSchema.virtual('list', {
    ref: 'List', 
    localField: '_id',
    foreignField: 'user'
});

// item
userSchema.virtual('item', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'user'
});

// Hiding return data for User model
userSchema.methods.getPublicProfile = function() {
    const user = this; 
    const userObject = user.toObject();

    // hide data
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.items;
    // return user
    return userObject;
}

// generate login token
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, keys.TOKEN_SECRET, { expiresIn: '1h'});
    user.tokens = user.tokens.concat({ token }); // assign token to user tokens
    await user.save(); 

    return token; 
}


// find credentials function
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) throw new Error('User is not registered. Please try another email!');

    // comparing passwords
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Passwords are not matching. Please enter again!')
    }
    // return user
    return user;
};


// hasing passwordbefore schema save
userSchema.pre('save', async function (next) {
    const user = this // get user

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8); // hashed password
    }
    next(); // proceed next
});
  

// delete user lists when user is removed
userSchema.pre('remove', async function(next) {
    const user = this;

    await List.deleteMany({ user: user._id });
    await Item.deleteMany({ user: user._id });
    next(); // continue proceeding request
});



const User = mongoose.model('User', userSchema);
module.exports = User;