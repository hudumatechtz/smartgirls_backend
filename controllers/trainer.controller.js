// /Import Trainer model
const Trainer = require("../models/trainer.model");

// /Import School model
const School = require("../models/school.model");

// Get all Trainers
exports.getAdminTrainers = async (req, res, next) => {
  const trainers = await Trainer.find();

  try {
    res.render("trainers-admin", {
      trainers: trainers,
    });
  } catch (err) {
    next(err);
  }
};

//GET add Trainer
exports.getAddTrainer = async (req, res) => {
  const message = "";
  const schools = await School.find();
  try {
    res.render("add-trainer", { message: message, schools: schools });
  } catch (err) {
    console.error(err);
  }
};

//POST add trainer
exports.postAddTrainer = async (req, res, next) => {
  var name = req.body.name;
  var slug = name.replace(/\s+/g, "-").toLowerCase();
  var phone = req.body.phone;
  var email = req.body.email;
  var school = req.body.school;

  const schools = await School.find();
  const trainer = await Trainer.findOne({ slug: slug });
  try {
    if (trainer) {
      console.log("Trainer already exist");

      message = "Trainer name exists, Choose another.";
      res.render("add-trainer", { message: message, schools: schools });
    } else {
      var tre = new Trainer({
        name: name,
        slug: slug,
        email: email,
        phone: phone,
        school: school,
      });
      tre.save(async (err) => {
        if (err) return console.log(err);

        console.log("Add trainer success");
        message = "Trainer was posted successfuly, To view go to trainers";
        res.render("add-trainer", { message: message, schools: schools });
      });
    }
  } catch (err) {
    next(err);
  }
};

// GET edit trainer
exports.getEditTrainer = async (req, res, next) => {
  const message = "";
  const trainer = await Trainer.findById(req.params.id);

  try {
    res.render("edit-trainer", {
      name: trainer.name,
      id: trainer._id,
      message: message,
    });
  } catch (err) {
    next(err);
  }
};

//POST Edit-trainer
exports.postEditTrainer = async (req, res, next) => {
  var name = req.body.name;
  var slug = name.replace(/\s+/g, "-").toLowerCase();
  var id = req.params.id;

  const trainer = await Trainer.findOne({ slug: slug, _id: { $ne: id } });
  try {
    if (trainer) {
      console.log("Trainer already exist");
      message = "Trainer name exists, Choose another.";
      res.render("edit-trainer", {
        name: name,
        id: id,
        message: message,
      });
    } else {
      const tre = await Trainer.findById(id);
      try {
        tre.name = name;
        tre.slug = slug;
        tre.save(async (err) => {
          if (err) return console.log(err);

          console.log("Trainer Edited success");
          message = "Trainer was edited successfuly, To view go to trainers";
          res.render("edit-trainer", { name: name, id: id, message: message });
        });
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
};

//  Get delete trainer
exports.getDeleteTrainer = (req, res) => {
  Trainer.findByIdAndRemove(req.params.id, async (err) => {
    if (err) return console.log(err);

    res.redirect("/trainers-admin");
  });
};
