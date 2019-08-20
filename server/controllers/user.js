const User = require('../models/user');
const updateObj = require('./subs-controller/edit-model');
const upload = require('../services/image-upload');
const singleUpload = upload.single('image');

// get user info
exports.getUser = async (req,res) => {
    try {
        const user = await User.findById(req.user.id);

        if(!user) return res.status(400).send({ error: 'User is not found!'});

        // return user
        res.status(200).json(user.getPublicProfile());
    } catch(e) {
        res.status(400).send({ error: e.message});
    }
}


// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('_id name email avatar following followers');
        res.status(200).json(users);
    } catch(e) {
        res.status(400).send({ error: e.message});
    }
};


// updating user
exports.updateUser = async (req, res) => {
    try {
        // update user
        updateObj(req.user, req.body, ["name", "email", "password"]);

        // save and return user
        await req.user.save();
        res.status(201).json(req.user.getPublicProfile());
    } catch(e) {
        res.status(400).send({ error: e.message});
    }
}


// delete user
exports.deleteUser = async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).json(req.user.getPublicProfile());
    } catch(e) {
        res.status(400).send({ error: e.message});
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
            user.save(); // save user
            res.status(200).json(user.getPublicProfile());
        });
    } catch(e) {
        res.status(400).send({ error: e.message});
    };
}


// following/unfollowing
exports.addFollowing = async (req, res, next) => {
    const { userId, followId } = req.body;

    try {
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { following: followId }},
            (err, result) => {
                if(err) return res.status(400).json({ error: err });

                next(); // move to next actions
            }
        )
    } catch(e) {
        res.status(400).send({ error: e.message});
    }
}

exports.removeFollowing = async (req, res, next) => {
    const { userId, unfollowId } = req.body;

    try {
        await User.findByIdAndUpdate(
            userId,
            { $unset: { following: unfollowId }},
            (err, result) => {
                if(err) return res.status(400).json({ error: err });

               next(); // move to next actions
            }
        )
    } catch(e) {
        res.status(400).json({ error: e.message })
    }
}


// add/remove followers
exports.addFollower = async (req, res) => {
    const { userId, followId } = req.body;

    try {
        await User.findByIdAndUpdate(
            followId,
            { $addToSet: { followers: userId}},
            { new: true}
        )
        .populate("following", "_id name email")
        .populate("followers", "_id name email")
        .exec(async (err, result) => {
            if(err) return res.status(400).json({ error: err });

            res.status(200).json({
                message: 'Add following and followers successfully!'
            });
        })
    } catch(e) {
        res.status(400).json({ error: e.message })
    }
}


exports.removeFollower = async (req, res) => {
    const { userId, unfollowId } = req.body;

    try {
        await User.findByIdAndUpdate(
            unfollowId,
            { $unset: { followers: userId}},
            { new: true}
        )
        .populate("following", "_id name email")
        .populate("followers", "_id name email")
        .exec(async (err, result) => {
            if(err) return res.status(400).json({ error: err });

            res.status(200).json({
                message: 'Remove following and followers successfully!'
            });
        })
    } catch(e) {
        res.status(400).json({ error: e.message })
    }
}
