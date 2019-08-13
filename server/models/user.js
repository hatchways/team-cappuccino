const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const List = require('./list');



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
            if(!validator.isEmail(value)) throw new Error('Email is invalid.')
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        data: Buffer,
        contentType: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
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
    }]
});



// matching passwords for log in
userSchema.methods.hasSamePassword = function(requestedPassword) {
    // compareSync is used to compare input password and password in db
    return bcrypt.compareSync(requestedPassword, this.password);
  }
  
  
// Save data 
userSchema.pre('save', function(next) {
    const user = this;
    // Hashing password
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});



module.exports = mongoose.model('User', userSchema);