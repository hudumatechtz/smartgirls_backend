const router = require("express").Router();
const pages = require("../controllers/pages.controller");

router.get("/", pages.getIndex);
router.get("/about", pages.getAbout);
router.get("/activities", pages.getActivities);

module.exports = router;
