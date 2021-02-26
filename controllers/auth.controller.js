const User = require("../models/user.model");
const bcyrpt = require("bcrypt");
exports.getLogin = async (req, res, next) => {
  res.render("login");
};

exports.postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.redirect("/account/login");
    }
    const doMatch = await bcyrpt.compare(password, user.password);
    // if (!doMatch) {
    //   throw new Error("Password or username is incorrect");
    // }
    console.log(doMatch);
    res.json({ match: doMatch });
  } catch (error) {
    next(error);
  }
};

exports.postRegister = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res.redirect("/account/login");
    }
    const hashedPassword = await bcyrpt.hash(password, 12);
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.json({ message: "User could not be saved" });
    }
    // res.redirect("/account/login");
    res.json({ user: savedUser });
  } catch (error) {
    next(error);
  }
};
