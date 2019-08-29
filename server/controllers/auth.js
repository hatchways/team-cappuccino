const User = require("../models/user");
const { sendSignUpConfirmation } = require("../services/sendgrid-email");

// registering user
exports.register = async (req, res) => {
  // check if user exists or not
  const userExisted = await User.findOne({ email: req.body.email });
  // check user
  if (userExisted)
    return res.status(403).json({ error: "Email is already registered." });

  // create new user
  const user = new User(req.body);
  await user.save();
  sendSignUpConfirmation(req.body.email, req.body.name);
  res.status(201).json({ message: "Account is created. Please log in now!" });
};

// logging in user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return "";

  User.findOne({ email }, (err, user) => {
    if (err || !user)
      return res.status(401).json({
        error: "Email is not registered!"
      });

    if (!user.authenticate(password))
      return res.status(401).json({
        error: "Email or Password is not matching"
      });

    // genrate token
    const token = user.generateToken();
    const { _id, name, email } = user;
    res.json({
      user: { _id, name, email },
      token
    });
  });
};
