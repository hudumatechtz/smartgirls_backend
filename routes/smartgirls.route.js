const router = require("express").Router();
const pages = require("../controllers/pages.controller");

router.get("/", pages.getIndex);
router.get("/about", pages.getAbout);

module.exports = router;
