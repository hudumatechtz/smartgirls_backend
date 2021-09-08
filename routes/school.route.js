const router = require("express").Router();
const school = require("../controllers/school.controller");

router.get("/schools", school.getSchools);
router.get("/schools-admin", school.getAdminSchools);
router.get("/schools-admin/add-school", school.getAddSchool);
router.post("/schools-admin/add-school", school.postSchool);
router.get("/schools-admin/edit-school/:id", school.getEditSchools);
router.post("/schools-admin/edit-school/:id", school.postEditSchools);
router.get("/schools-admin/delete-school/:id", school.getDeleteSchools);
module.exports = router;
