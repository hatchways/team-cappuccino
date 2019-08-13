const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


mongoose.model('List', listSchema);