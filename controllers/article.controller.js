const Article = require("../models/article.model");
exports.postArticle = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    if (!req.file) {
      const error = new Error("No image file was provided");
      error.statusCode = 422;
      throw error;
    }
    const creator = req.user.username;
    const imageUrl = req.file.path;

    const newArticle = new Article({
      title: title,
      description: description,
      imageUrl: imageUrl,
      creator: creator,
    });
    const message = '';
    const savedArticle = await newArticle.save();
    if(!savedArticle){
      message = "Artcle could not be posted";
      return res.render("", {message: message});
    }
    message = "Article was posted successfuly";
    res.render("", {message: message});
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
  res.render("add-article");
};
exports.getAdminArticles = async (req, res, next) => {
  res.render('articles-admin');
}