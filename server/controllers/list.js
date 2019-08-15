const List = require('../models/list');
const User = require('../models/user');

// create list
exports.createList = async (req, res) => {
    const list = new List({
        ...req.body,
        user: req.user._id
    });

    try {
        // save list and update user model
        await list.save(); 
        // return list
        res.status(201).send(list);
    } catch(e) {
        res.status(500).send(e);
    }
}


// get users lists
exports.getAllLists = async (req, res) => {
    try {
        await req.user.populate('list').execPopulate();

        res.send(req.user.list);
    } catch(e) {
        res.status(500).send(e);
    }
}


// get single list
exports.getSingleList = async (req, res) => {
    try {
        // get list id
        const _id = req.params.id;
        // find list
        const list = await List.findOne({ _id, user: req.user._id });
        // check if list is available
        if(!list) res.status(401).send({
            error: 'List is not found!'
        });
        res.send(list);
    } catch (e) {
        res.status(500).send(e);
    }
}


// edit list
exports.updateList = async (req, res) => {
    // check for validation updates
    const updates = Object.keys(req.body);
    const allowedUpdateFields = ["name"];
    const isValidOperation = updates.every(update => allowedUpdateFields.includes(update));

    // perform validation updates check
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid Data! Pleas try again'});
    }

    try {
        const _id = req.params.id;

        const list = await List.findOne({ _id, user: req.user._id });

        // update list
        updates.forEach(update => list[update] = req.body[updates]);

        await list.save();

        if(!list) res.status(400).send({
            error: 'List is not found!'
        });
        // return list
        res.status(201).json(list);
    } catch(e) {
        res.status(400).send({ error: e.message});
    }
}


// delete list
exports.deleteList = async (req, res) => {
    try {
        const _id = req.params.id;

        const list = await List.findOne({ _id, user: req.user._id });
        
        list.remove(); // list remove()

        if(!list) res.status(404).send({ error: 'List is not found!' });

        // return list
        res.send(list);
    } catch(e) {
        res.status(400).send({ error: e.message});
    }
}