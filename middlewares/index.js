const User = require("../models/user.model");
const middlewareObj = {};

middlewareObj.getUser = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return next();
    }
    const user = await User.findById(req.session.user._id);
    if (!user) {
      console.log("No user");
      return next();
    }
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};

middlewareObj.isLoggedIn = async (req, res, next) => {
  try {
    if (req.session.isLoggedIn) {
      return next();
    }
    // req.flash("error", "You need to be logged in to do that!");
    message = "You need to be logged in to do that!";
      res.render("login", { message: message });
    // res.redirect("/account/login");
  } catch (error) {
    next(error);
  }
};

module.exports = middlewareObj;