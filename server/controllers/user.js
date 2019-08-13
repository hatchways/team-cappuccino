const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user');

// user register
exports.register =  async (req, res)  => {
    try {
        const userExisted = await User.findOne({ email: req.body.email });

        // check user existing
        if(userExisted) return res.status(422).send({ errors: [{
            title: 'Invalid Email',
            detail: 'Email is taken! Please register another one!'
        }]});
        
        //register new user
        const user = await new User(req.body);
        await user.save();

        res.status(201).json({ message: "Signup success! Please login into your account." });
    } catch (e) {
        res.status(400).send(e);
    }
}


// user sign in
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // find email and password
        User.findOne({ email}, (err, user) => {
            if(err || !user) return res.status(401).send({
                error: "User is not existed. Please sign up!"
            });

            // compare password
            if (user.hasSamePassword(password)) {
                // assign token
                const token = jwt.sign({
                    userId: user.id,
                    name: user.name
                }, keys.TOKEN_SECRET, { expiresIn: '1h'});

                return res.status(200).send(user);
            }
        })
    } catch(e) {
        res.status(422).send({
            error: "Invalid data!"
        });
    }
}


// sign out user
exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.status(200).redirect('/user/signin')
}