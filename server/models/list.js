const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


mongoose.model('List', listSchema);