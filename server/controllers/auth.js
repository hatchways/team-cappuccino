const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user');


// registering user
exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) return res.status(422).send({
        error: 'Invalid data!'
    });

    await User.findOne({email}, async (err, existingUser) => {
        if(err) res.status(400).send(err);
        
        // check if email is taken
        if(existingUser) res.status(400).send({
            errors: 'Email is taken! Please try another one!'
        });
        // create new user
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    });
}


// logging in user
exports.login =  async (req, res) => {
    const { email, password } = req.body;
  
    if (!password || !email) {
      return res.status(422).send({error: 'Please provide valid email and password!'});
    }
  
    // Find user by email
    await User.findOne({email}, async (err, user) => {
      if (err) return res.status(400).send(err);
        
      // check if user is in db or not
      if (!user) return res.status(400).send({
          error: 'User is not registered. Please sign up your account now!'
      });
  
      // check password matching
      if (user.hasSamePassword(password)) {
        // assign token
        const token = jwt.sign({
          userId: user.id,
          name: user.name
        }, keys.TOKEN_SECRET, { expiresIn: '1h'});
        // print out token
        res.send({ message: 'User is currently logging in!', token});
      } else {
            res.status(400).send({error: 'Email or password is not correct!'});
      }
    });
};
