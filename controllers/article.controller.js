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
    res.send("<h3>Girls articles page</h3>");
  } catch (error) {
    next(error);
  }
};
