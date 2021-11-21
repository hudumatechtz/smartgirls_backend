const router = require("express").Router();
const pages = require("../controllers/pages.controller");
const middleware = require("../middlewares/index");

router.get("/", pages.getIndex);
router.get("/home", pages.getIndex);
router.get("/about", pages.getAbout);
router.get("/activities", pages.getActivities);
router.get("/workforce", pages.getWorkforce);
router.get("/gallery", pages.getGallery);
router.get("/dashboard", middleware.isLoggedIn ,pages.getDashboard);

module.exports = router;