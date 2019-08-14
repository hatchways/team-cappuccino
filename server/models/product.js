const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true,
        trim: true
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


module.exports = mongoose.model('Product', productSchema);