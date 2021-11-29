const router = require("express").Router();
const gallery = require("../controllers/gallery.controller");
const middleware = require("../middlewares/index");

// router.get("/coachers", coacher.getCoachers);
router.get("/gallery-admin", middleware.isLoggedIn, gallery.getAdminGallery);
router.get("/gallery-admin/add-image", middleware.isLoggedIn, gallery.getAddImage);
router.post("/gallery-admin/add-image", middleware.isLoggedIn, gallery.postImage);

module.exports = router;
