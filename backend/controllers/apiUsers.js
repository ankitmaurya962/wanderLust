const User = require("../models/user.js");

module.exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email });
  const registeredUser = await User.register(newUser, password);

  req.login(registeredUser, (err) => {
    if (err) {
      return next(err);
    }

    res.json({
      success: true,
      user: registeredUser,
    });
  });
};

module.exports.login = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  });
};
