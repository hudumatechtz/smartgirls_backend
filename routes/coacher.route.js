const router = require("express").Router();
const coacher = require("../controllers/coacher.controller");

// router.get("/coachers", coacher.getCoachers);
router.get("/coachers-admin", coacher.getAdminCoachers);
router.get("/coachers-admin/add-coacher", coacher.getAddCoacher);
router.post("/coachers-admin/add-coacher", coacher.postAddCoacher);
router.get("/coachers-admin/edit-coacher/:id", coacher.getEditCoacher);
router.post("/coachers-admin/edit-coacher/:id", coacher.postEditCoacher);
router.get("/coachers-admin/delete-coacher/:id", coacher.getDeleteCoacher);
module.exports = router;
