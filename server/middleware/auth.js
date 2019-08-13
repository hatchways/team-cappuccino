const jwt = require('jsonwebtoken');
const User = require('../models/user');
const keys = require('../config/keys');
const normalizeErrors = require('../helpers/mongoose_error');

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        // Check token
        if(token) {
            const user = parseToken(token);
            User.findById(user.userId, (err, user) => {
                if(err) return res.status(422).send({
                        errors: normalizeErrors(err.errors)
                    })
                // return user
                user ? res.locals.user = user : notAuthorized(res)
            })
        } else {
            return notAuthorized(res);
        }
    } catch (e) {
        console.error(e);
    }
}

const parseToken = (token) => {
    // token = [Bearer, token]
    return jwt.verify(token.split(' ')[1], keys.TOKEN_SECRET);
}

const notAuthorized = (res) => {
    return res.status(401).send({errors: [{
        title: 'Not Authorized!',
        detail: 'Please log into your account!'
    }]})
}