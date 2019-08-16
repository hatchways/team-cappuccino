const User = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '') || req.headers.authorization;

    if(!token) return res.status(400).send({
        error: 'Token is invalid!'
    });

  try {
      const decodedToken = jwt.verify(token,keys.TOKEN_SECRET); // decoding input token
      const user = await User.findOne({ _id: decodedToken._id }); // find user with same token

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