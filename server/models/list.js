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
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});


mongoose.model('List', listSchema);