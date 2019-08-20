const User = require('../models/user');


// registering user
exports.register = async (req, res) => {
  // create new user
  const user = new User(req.body);

  try {
      // save user
      await user.save();
      res.status(201).json(user.getPublicProfile());
  } catch(e) {
      res.status(400).json({ error: 'Email is already registered!' });
  };
};


// logging in user
exports.login = async (req, res) => {
    try {
        // get password and email
        const user = await User.findByCredentials(req.body.email, req.body.password);
        // assign token 
        const token = await user.generateAuthToken();
        
        res.json({ user: user.getPublicProfile(), token });// return user
    } catch(e) {
      res.status(400).send({ error: 'Password or Email is not correct!' });
    }
}


