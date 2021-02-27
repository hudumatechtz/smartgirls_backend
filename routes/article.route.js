const router = require("express").Router();
const article = require("../controllers/article.controller");

router.get("/", article.getArticles);

router.get("/add-article", article.getAddArticle);
module.exports = router;
