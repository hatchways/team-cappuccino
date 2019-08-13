const List = require('../models/list');


// create list
exports.createList = async (req,res) => {
    const list = new List({
        ...req.body,
        createdBy: req.user._id
    });

    try {
        await list.save();
        res.status(201).send(list);
    } catch (e) {
        res.status(500).send({
            error: 'Invalid data! Please try again!'
        })
    }
}