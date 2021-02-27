const Article = require("../models/article.model");
exports.postArticle = async (req, res, next) => {
  const { title, file } = req.body;
  try {
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
exports.getAdminArticles = async (req, res, next) => {
  res.render('articles-admin');
}
exports.getAddArticle = (req, res, next)=>{
  res.render('add-article');
}
