const router = require("express").Router();
const trainer = require("../controllers/trainer.controller");
const middleware = require("../middlewares/index");

// router.get("/trainers", trainer.getTrainers);
router.get("/trainers-admin", middleware.isLoggedIn, trainer.getAdminTrainers);
router.get("/trainers-admin/add-trainer", middleware.isLoggedIn, trainer.getAddTrainer);
router.post("/trainers-admin/add-trainer", middleware.isLoggedIn, trainer.postAddTrainer);
router.get("/trainers-admin/edit-trainer/:id", middleware.isLoggedIn, trainer.getEditTrainer);
router.post("/trainers-admin/edit-trainer/:id", middleware.isLoggedIn, trainer.postEditTrainer);
router.get("/trainers-admin/delete-trainer/:id", middleware.isLoggedIn, trainer.getDeleteTrainer);
module.exports = router;
