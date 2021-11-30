const Article = require("../models/article.model");
exports.postArticle = async (req, res, next) => {
  const { title, description, link } = req.body;
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
      link: link
    });
    const savedArticle = await newArticle.save();
    if (!savedArticle) {
      message = "Article could not be posted";
      return res.render("add-article", { message: message });
    }
    message = "Article was posted successfully, To view go to articles";
    res.render("add-article", { message: message });
  } catch (error) {
    next(error);
  }
};

exports.getArticles = async (req, res, next) => {
  const articles = await Article.find();
  try {
    res.render("articles", {articles: articles});
  } catch (error) {
    next(error);
  }
};
exports.getAddArticle = (req, res, next) => {
  res.render("add-article", { message: "" });
};

exports.getEditArticle = async(req, res, next) => {
  const message = "";

  const article = await Article.findById(req.params.id);
  try {
    if (!article) {
      console.log("Article does not exist");
      message = "Article does not exists, Choose or Add another.";
      res.render("add-article", {
        message: message
      });
    } else {
      res.render("edit-article", {
        article: article,
        message: message
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.postEditArticle = async (req, res, next) => {
  
  let message = "";
  const article = await Article.findById(req.params.id);
  try {
    if (!article) {
      console.log("Article does not exist");
      message = "Article does not exists, Choose or Add another.";
      res.render("add-article", {
        message: message
      });
    }

    if (!req.file) {
      const error = new Error("No image file was provided");
      error.statusCode = 422;
      return res.render("add-article", { message: error.message });
    }
    
      article.title = req.body.title;
      article.description = req.body.description;
      article.imageUrl = req.file.path;
      article.creator = req.user.username;
      article.link = req.body.link;
    
     const savedArticle = await article.save();
    if (!savedArticle) {
      message = "Article could not be posted";
      return res.render("edit-article", { message: message, article: article });
    }

          console.log("Article Edited success");
          message = "Article was edited successfully, To view go to articles";
          res.render("edit-article", {
            article:article,
            message: message
          });
    
  } catch (error) {
    next(error);
  }
};

exports.getAdminArticles = async (req, res, next) => {
  // const deleteArticle = await Article.deleteMany({});
  try {
    const articles = await Article.find({});
    res.render("articles-admin", { articles: articles }); 
  } catch (error) {
    next(error);
  }
};

//  Get delete article
exports.getDeleteArticle = (req, res) => {
  Article.findByIdAndRemove(req.params.id, async (err) => {
    if (err) return console.log(err);

    
      res.redirect("/articles-admin");
    
  });
};

