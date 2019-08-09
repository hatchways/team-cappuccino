const mongoose = require('mongoose');

// Connecting mongoose
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
});