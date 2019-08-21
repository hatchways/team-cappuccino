const editModel = (user, body, fields) => {
    const updates = Object.keys(body);
    const allowedUpdateFields = fields;
    const isValidOperation = updates.every(update => allowedUpdateFields.includes(update));

    // check fields updates
    if (!isValidOperation) {
        return res.status(400).send( { error: 'Invalid Data!' });
    }

    updates.forEach(update => user[update] = body[update]);

    return user;
}

module.exports = editModel;