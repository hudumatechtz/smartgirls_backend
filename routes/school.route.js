const router = require("express").Router();
const school = require("../controllers/school.controller");
const middleware = require("../middlewares/index");

// router.get("/schools", school.getSchools);
router.get("/schools-admin", middleware.isLoggedIn, school.getAdminSchools);
router.get("/schools-admin/add-school", middleware.isLoggedIn, school.getAddSchool);
router.post("/schools-admin/add-school", middleware.isLoggedIn, school.postAddSchool);
router.get("/schools-admin/edit-school/:id", middleware.isLoggedIn, school.getEditSchool);
router.post("/schools-admin/edit-school/:id", middleware.isLoggedIn, school.postEditSchool);
router.get("/schools-admin/delete-school/:id", middleware.isLoggedIn, school.getDeleteSchool);
module.exports = router;
