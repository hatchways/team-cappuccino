const mongoose = require('mongoose');
const keys = require('../config/keys');

// Connecting mongoose
mongoose.connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
    .then(() => console.log(`Connecting to mongodb!`))
    .catch(e => console.error(e.message));