const Item = require('../models/item');
const List = require('../models/list');
const User = require('../models/user');


// adding item
exports.addItem = (req, res ) => {
    const { name, url, list } = req.body;
    const item = new Item({
        name, url, user: req.user._id
    })

    try {
        List.findById(list._id)
        .populate('items')
        .populate('user')
        .exec(async function(err, foundList) {
            if(err) return res.status(400).json({
                error: 'Invalid data!'
            });

            foundList.items.push(item); // add to items
            // update item
            item.list = foundList;


            // save item 
            await item.save();
            await foundList.save();
            // update user model
            // await User.updateOne({ 
            //     _id: req.user._id}, 
            //     {$push: { items: item }
            // }, function(){});
            }
        );
    
        res.status(200).json(item);
    } catch(e) {
        res.status(400).send({ error: e.message});
    }
}

// getAllItems
exports.getAllItems = async (req, res) => {
    try {
        await req.user.populate('items').execPopulate();

        res.status(200).send(req.user.items);
    } catch(e) {
        res.status(400).send({ 'error': e.message });   
    }
}


// get single item
exports.getSingleItem = async (req, res) => {
    const _id = req.params.id;

    try {
        const item = await Item.findOne({ _id, user: req.user._id });

        if(!item) res.status(401).json({
            error: 'Item is not found!'
        });

        // return item
        res.status(200).json(item);
    } catch(e) {
        res.status(400).send({ error: e.message });   
    }
}


// Update item
exports.updateItem = async (req, res) => {
    // check for validation updates
    const updates = Object.keys(req.body);
    const allowedUpdateFields = ["name", "url"];
    const isValidOperation = updates.every(update => allowedUpdateFields.includes(update));

    // perform validation updates check
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid Data! Pleas try again'});
    }

    try {
        const _id = req.params.id;

        const item = await Item.findOne({ _id, user: req.user._id });

        // update list
        updates.forEach(update => item[update] = req.body[updates]);

        await item.save();

        if(!item) res.status(400).send({
            error: 'Item is not found!'
        });
        // return list
        res.status(201).json(item);
    } catch(e) {
        res.status(400).send({ error: e.message});    
    }
}


// Delete Item
exports.deleteItem = async(req, res) => {
    const _id = req.params.id;

    try {
        const item = await Item.findOne({ _id, user: req.user._id });

        if(!item) res.status(404).send({ error: 'Item is not found!' });

        // return list
        item.remove();
        res.send(item);
    } catch(e) {
        res.status(400).send({ error: e.message});
    }
}
