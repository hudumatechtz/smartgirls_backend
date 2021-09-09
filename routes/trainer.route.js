const router = require("express").Router();
const trainer = require("../controllers/trainer.controller");

// router.get("/trainers", trainer.getTrainers);
router.get("/trainers-admin", trainer.getAdminTrainers);
router.get("/trainers-admin/add-trainer", trainer.getAddTrainer);
router.post("/trainers-admin/add-trainer", trainer.postAddTrainer);
router.get("/trainers-admin/edit-trainer/:id", trainer.getEditTrainer);
router.post("/trainers-admin/edit-trainer/:id", trainer.postEditTrainer);
router.get("/trainers-admin/delete-trainer/:id", trainer.getDeleteTrainer);
module.exports = router;
