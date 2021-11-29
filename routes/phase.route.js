const router = require("express").Router({mergeParams:true});
const phase = require("../controllers/phase.controller");
const middleware = require("../middlewares/index");

// router.get("/phases", phase.getPhases);
// router.get("/phases-admin", middleware.isLoggedIn, phase.getAdminPhases);
router.get("/phases-admin/:id/add-phase", middleware.isLoggedIn, phase.getAddPhase);
router.post("/phases-admin/:id/add-phase", middleware.isLoggedIn, phase.postAddPhase);
router.get("/phases-admin/:id/edit-phase/:phase_id", middleware.isLoggedIn, phase.getEditPhase);
router.post("/phases-admin/:id/edit-phase/:phase_id", middleware.isLoggedIn, phase.postEditPhase);
router.get("/phases-admin/delete-phase/:phase_id", middleware.isLoggedIn, phase.getDeletePhase);
module.exports = router;
