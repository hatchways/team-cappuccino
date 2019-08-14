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
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
});


const List = mongoose.model('List', listSchema);
module.exports = List;