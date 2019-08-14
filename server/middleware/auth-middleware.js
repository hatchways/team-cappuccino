const User = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const auth = async (req, res, next) => {
  try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decodedToken = jwt.verify(token,keys.TOKEN_SECRET); // decoding input token
      const user = await User.findOne({ _id: decodedToken._id, 'tokens.token': token }); // find user with same token

      if (!user){
          throw new Error('Invalid token!');
      }
      req.user = user; 
      next(); 
  } catch(e) {
      res.status(401).send({ error: 'You need to log into your account!~'});
  }
}

module.exports = auth;