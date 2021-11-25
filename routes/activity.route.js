const router = require("express").Router();
const activity = require("../controllers/activity.controller");
const middleware = require("../middlewares/index");

// router.get("/activities", activity.getActivities);
router.get("/activities-admin", middleware.isLoggedIn, activity.getAdminActivities);
router.get("/activities-admin/add-activity", middleware.isLoggedIn, activity.getAddActivity);
router.post("/activities-admin/add-activity", middleware.isLoggedIn, activity.postAddActivity);
router.get("/activities-admin/edit-activity/:id", middleware.isLoggedIn, activity.getEditActivity);
router.post("/activities-admin/edit-activity/:id", middleware.isLoggedIn, activity.postEditActivity);
router.get("/activities-admin/delete-activity/:id", middleware.isLoggedIn, activity.getDeleteActivity);
module.exports = router;
