const router = require("express").Router();
const school = require("../controllers/school.controller");

router.get("/schools", school.getSchools);
router.get("/schools-admin", school.getAdminSchools);
router.get("/schools-admin/add-school", school.getAddSchool);
router.post("/schools-admin/add-school", school.postSchool);
module.exports = router;
