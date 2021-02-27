const router = require("express").Router();
const article = require("../controllers/article.controller");

router.get("/articles", article.getArticles);
router.get("/articles-admin", article.getAdminArticles);
router.get("/articles-admin/add-article", article.getAddArticle);
module.exports = router;
