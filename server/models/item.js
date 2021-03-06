const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const itemSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    prices: [{
        date: {
            type: Date,
            default: Date.now
        },
        price: Number,
        _id: false
    }],
    url: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }, 
    image: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    }
});




module.exports = mongoose.model('Item', itemSchema);