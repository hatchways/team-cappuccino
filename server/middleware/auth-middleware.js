const User = require('../models/user');

exports.authMiddleware = async (req, res, next) => {
    // Get token
    const token = req.headers.authorization;

    // check token
    if(token) {
      // token = [Bearer,token]
      const user = parseToken(token);
      // Find user id
      await User.findById(user.userId, async (err, user) => {
        if (err) return res.status(422).send(err);
        // import user
        if(user) {
          res.locals.user = await user;
          next();
        } else {
          return notAuthorized(res);
        }
      })
    } else {
      return notAuthorized(res);
    };
};


// Token Decoding
const parseToken = (token) => {
    // token = [Bearer, token]
    return jwt.verify(token.split(' ')[1], keys.SECRET);
}


const notAuthorized = (res) => {
  return res.status(401).send({errors: 'Unauthorized! Please log into your account!'});
}