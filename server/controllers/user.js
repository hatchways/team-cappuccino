const User = require('../models/user');
const upload = require('../services/image-upload');
const singleUpload = upload.single('image');

// get user info
exports.getUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) return res.status(400).send({ error: 'User is not found!'});

        // return user
        res.status(200).json(user.getPublicProfile());
    } catch(e) {
        res.status(500).send(e);
    }
}


// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('_id name email following followers');
        res.status(200).json(users);
    } catch(e) {
        res,status(400).send(e);
    }
};


// updating user
exports.updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdateFields = ["name", "email", "password"];
    const isValidOperation = updates.every(update => allowedUpdateFields.includes(update));

    // check fields updates
    if (!isValidOperation) {
        return res.status(400).send( { error: 'Invalid Data!' });
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update]);

        // save and return user
        await req.user.save();
        res.status(201).json(req.user.getPublicProfile());
    } catch(e) {
        res.status(400).send(e);
    }
}


// delete user
exports.deleteUser = async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).json(req.user.getPublicProfile());
    } catch(e) {
        res.status(400).send(e);
    }
}


// upload user avatar
exports.uploadAvatar = (req, res) => {
    try {
        singleUpload(req, res, async function(err){
            if(err) res.status(400).json({ error: err});
    
            // update User image
            const user = await User.findById(req.params.id);
            user.avatar = req.file.location;
            res.status(200).json(user.getPublicProfile());
        });
    } catch(e) {
        res.status(500).json(e.message);
    }
};





















