const User = require("../models/user.model");
const bcyrpt = require("bcrypt");


// Get all Coachers
exports.getAdmins = async (req, res, next) => {
  const users = await User.find();

  try {
    res.render("admins-admin", {
      admins: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getLogin = async (req, res, next) => {
  const message = "";
  res.render("login", {message: message});
};

exports.postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  // console.log(req.body);
  try {
    const user = await User.findOne({ username: username });
    const error = new Error("Username or password is incorrect");
    error.statusCode = 401;
    if (!user) {
      throw error;
      // return res.redirect("/account/login");
    }
    const doMatch = await bcyrpt.compare(password, user.password);
    console.log(doMatch);
    if (!doMatch) {
      throw error;
    }
    req.session.isLoggedIn = doMatch;
    req.session.user = user;
    req.session.save();
    res.json({ match: doMatch });
  } catch (error) {
    next(error);
  }
};

exports.getRegister = async (req, res, next) => {
  res.render("add-admin", { message: ""});
};
exports.postRegister = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res.render("add-admin", { message: "Admin Username exists"});
    }
    const hashedPassword = await bcyrpt.hash(password, 12);
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.render("add-admin", { message: "Admin could not be saved" });
      // return res.json({ message: "User could not be saved" });
    }
    // res.redirect("/account/login");
    // res.json({ user: savedUser });
    res.render("add-admin", {
      message: "Admin added successfuly, To view go to Admins",
    });
  } catch (error) {
    next(error);
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};

exports.getDeleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, async (err) => {
    if (err) return console.log(err);

    res.redirect("/account/admins-admin");
  });
};
