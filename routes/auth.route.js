const router = require("express").Router();
const auth = require("../controllers/auth.controller");

router.get("/login", auth.getLogin);

router.get("/register", auth.getRegister);

router.post("/register", auth.postRegister);

router.post("/login", auth.postLogin);

router.get("/logout", auth.getLogout);
module.exports = router;
