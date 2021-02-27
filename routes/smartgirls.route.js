const router = require("express").Router();
const pages = require("../controllers/pages.controller");

router.get("/", pages.getIndex);
router.get("/about", pages.getAbout);
router.get("/activities", pages.getActivities);
router.get("/workforce", pages.getWorkforce);
router.get("/gallery", pages.getGallery);
router.get("/dashboard", pages.getDashboard);
router.get("/schools", pages.getSchools);
router.get("/trainers", pages.getTrainers);
router.get("/coachers", pages.getCoachers);

module.exports = router;
