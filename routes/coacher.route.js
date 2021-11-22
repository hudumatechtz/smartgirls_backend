const router = require("express").Router();
const coacher = require("../controllers/coacher.controller");
const middleware = require("../middlewares/index");

// router.get("/coachers", coacher.getCoachers);
router.get("/coachers-admin", middleware.isLoggedIn, coacher.getAdminCoachers);
router.get("/coachers-admin/add-coacher", middleware.isLoggedIn, coacher.getAddCoacher);
router.post("/coachers-admin/add-coacher", middleware.isLoggedIn, coacher.postAddCoacher);
router.get("/coachers-admin/edit-coacher/:id", middleware.isLoggedIn, coacher.getEditCoacher);
router.post("/coachers-admin/edit-coacher/:id", middleware.isLoggedIn, coacher.postEditCoacher);
router.get("/coachers-admin/delete-coacher/:id", middleware.isLoggedIn, coacher.getDeleteCoacher);
module.exports = router;
