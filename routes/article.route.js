const router = require("express").Router();
const article = require("../controllers/article.controller");
const middleware = require("../middlewares/index");

router.get("/articles", article.getArticles);
router.get("/articles-admin", middleware.isLoggedIn, article.getAdminArticles);
router.get("/articles-admin/add-article", middleware.isLoggedIn, article.getAddArticle);
router.post("/articles-admin/add-article", middleware.isLoggedIn, article.postArticle);
router.get("/articles-admin/delete-article/:id", middleware.isLoggedIn, article.getDeleteArticle);
router.get("/articles-admin/edit-article/:id", middleware.isLoggedIn, article.getEditArticle);
module.exports = router;
