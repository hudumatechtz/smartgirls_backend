const Article = require("../models/article.model");
exports.postArticle = async (req, res, next) => {
  const { title, description } = req.body;
  let message = "";
  try {
    if (!req.file) {
      const error = new Error("No image file was provided");
      error.statusCode = 422;
      return res.render("add-article", { message: error.message });
    }
    const creator = req.user.username;
    const imageUrl = req.file.path;
    const newArticle = new Article({
      title: title,
      description: description,
      imageUrl: imageUrl,
      creator: creator,
    });
    const savedArticle = await newArticle.save();
    if (!savedArticle) {
      message = "Article could not be posted";
      return res.render("add-article", { message: message });
    }
    message = "Article was posted successfuly, To view go to articles";
    res.render("add-article", { message: message });
  } catch (error) {
    next(error);
  }
};
exports.getArticles = async (req, res, next) => {
  try {
    res.render("articles");
  } catch (error) {
    next(error);
  }
};
exports.getAddArticle = (req, res, next) => {
  res.render("add-article", { message: "" });
};
exports.getAdminArticles = async (req, res, next) => {
  try {
    // const articles = await Article.find({}).limit(15);
    res.render("articles-admin"); 
  } catch (error) {
    next(error);
  }
};
