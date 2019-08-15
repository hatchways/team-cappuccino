const User = require('../models/user');


// registering user
exports.register = async (req, res) => {
  // create new user
  const user = new User(req.body);

  try {
      // save user
      await user.save();
      res.status(201).send(user.getPublicProfile());
  } catch(e) {
      res.status(400).send({ error: e.message });
  };
};


// logging in user
exports.login =  async (req, res) => {
  try {
      // get password and email
      const user = await User.findByCredentials(req.body.email, req.body.password);
      // assign token 
      const token = await user.generateAuthToken();
      
      res.send({ user: user.getPublicProfile(), token });// return user
  } catch(e) {
    res.status(400).send({ error: e.message });
  }
}


// logging out user
exports.logout = async (req, res) => {
  try {
      req.user.tokens = req.user.tokens.filter(token => {
          return token.token !== req.token;
      });

      await req.user.save();
      res.send();
  } catch(e) {
    res.status(400).send({ error: e.message });
  }
}

