const Article = require("../models/article.model");

exports.getIndex = async (req, res, next) => {
  // const deleteArticles = await Article.deleteMany({
  //   title: "Challenge in Phase 4 2021"
  // });
  const articles = await Article.find();
  try {
    res.render("home", { articles: articles });
  } catch (error) {
    next(error);
  }
};

exports.getAbout = (req, res, next) => {
  res.render("about");
};
exports.getActivities = (req, res, next) => {
  res.render("activities");
};
exports.getWorkforce = (req, res, next) => {
  res.render("workforce");
};
exports.getGallery = (req, res, next) => {
  res.render("gallery");
};
exports.getDashboard = (req, res, next) => {
  res.render("dashboard");
};
