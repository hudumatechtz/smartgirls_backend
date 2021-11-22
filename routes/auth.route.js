const router = require("express").Router();
const auth = require("../controllers/auth.controller");
const middleware = require("../middlewares/index");

router.get("/admins-admin", middleware.isLoggedIn , auth.getAdmins);

router.get("/login", auth.getLogin);

router.get("/register", auth.getRegister);

router.post("/register", auth.postRegister);

router.post("/login", auth.postLogin);

router.get("/logout", auth.getLogout);

router.get("/delete-admin/:id", middleware.isLoggedIn, auth.getDeleteUser);

module.exports = router;