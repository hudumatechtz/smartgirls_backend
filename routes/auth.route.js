const router = require("express").Router();
const auth = require("../controllers/auth.controller");
const middleware = require("../middlewares/index");

router.get("/admins-admin", middleware.isLoggedIn , auth.getAdmins);

router.get("/login", auth.getLogin);
router.post("/login", auth.postLogin);

router.get("/register", middleware.isLoggedIn, auth.getRegister);
router.post("/register", middleware.isLoggedIn, auth.postRegister);


router.get("/logout", middleware.isLoggedIn, auth.getLogout);

router.get("/delete-admin/:id", middleware.isLoggedIn, auth.getDeleteUser);

module.exports = router;
