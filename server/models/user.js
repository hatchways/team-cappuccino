const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) throw new Error('Email is invalid.')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain "pasword". Plese try another one!')
        }
    },
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }]
});


module.exports = mongoose.model('User', userSchema);