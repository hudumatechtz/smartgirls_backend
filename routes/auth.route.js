const router = require("express").Router();
const auth = require("../controllers/auth.controller");

router.get("/login", auth.getLogin);

router.post("/register", auth.postRegister);

router.post("/login", auth.postLogin);
module.exports = router;
