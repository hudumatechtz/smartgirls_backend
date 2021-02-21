const router = require("express").Router();
const article = require("../controllers/article.controller");

router.get("/", article.getArticles);

module.exports = router;
