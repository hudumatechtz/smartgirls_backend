const Phase = require("../models/phase.model");
// /Import Activity model
const Activity = require("../models/activity.model");


exports.postPhase = async (req, res, next) => {
  const {
    phaseNumber,
    theme,
    description
  } = req.body;
  let message = "";
  try {
    if (!req.file) {
      const error = new Error("No image file was provided");
      error.statusCode = 422;
      return res.render("add-phase", {
        message: error.message
      });
    }

    const newPhase = new Phase({
      phaseNumber: phaseNumber,
      theme: theme,
      description: description
    });
    const savedPhase = await newPhase.save();
    if (!savedPhase) {
      message = "Phase could not be posted";
      return res.render("add-phase", {
        message: message
      });
    }
    message = "Phase was posted successfully, To view go to activities";
    res.render("add-phase", {
      message: message
    });
  } catch (error) {
    next(error);
  }
};
exports.getPhases = async (req, res, next) => {
  const phases = await Phase.find();
  try {
    res.render("phases", {
      phases: phases
    });
  } catch (error) {
    next(error);
  }
};
exports.getAddPhase = (req, res, next) => {
  res.render("add-phase", {
    message: ""
  });
};
exports.getAdminPhases = async (req, res, next) => {
  // const deletePhase = await Phase.deleteMany({});
  try {
    const phases = await Phase.find({});
    res.render("phases-admin", {
      phases: phases
    });
  } catch (error) {
    next(error);
  }
};

//  Get delete phase
exports.getDeletePhase = (req, res) => {
  Phase.findByIdAndRemove(req.params.id, async (err) => {
    if (err) return console.log(err);


    res.redirect("/phases-admin");

  });
};