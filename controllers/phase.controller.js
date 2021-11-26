const Phase = require("../models/phase.model");
// /Import Activity model
const Activity = require("../models/activity.model");


exports.getAddPhase = async (req, res, next) => {
  const id = req.params.id;
  const activity = await Activity.findById(id);
  try {
    if (!activity) {
      console.log("Activity does not exist");
      message = "Activity year does not exists, Add new year here.";
      res.render("add-activity", {
        message: message
      });
    } else {
      res.render("add-phase", {
        message: "",
        activity: activity
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.postPhase = async (req, res, next) => {
  const {
    phaseNumber,
    theme,
    description
  } = req.body;
  const id = req.params.id;
  let message = "";

  const activity = await Activity.findById(id);
  try {
    if (!activity) {
      console.log("Activity does not exist");
      message = "Activity year does not exists, Choose another.";
      res.render("add-activity", {
        message: message
      });
    } else {
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
      activity.phases.push(newPhase);
      activity.save(async (err) => {
        if (err) return console.log(err);

        message = "Phase was posted successfully, To view go to activities";
        res.render("add-phase", {
          message: message
        });
      });

    }

  } catch (error) {
    next(error);
  }
};


// exports.getPhases = async (req, res, next) => {
//   const phases = await Phase.find();
//   try {
//     res.render("phases", {
//       phases: phases
//     });
//   } catch (error) {
//     next(error);
//   }
// };



// exports.getAdminPhases = async (req, res, next) => {
//   // const deletePhase = await Phase.deleteMany({});
//   try {
//     const phases = await Phase.find({});
//     res.render("phases-admin", {
//       phases: phases
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// GET edit phase
exports.getEditPhase = async (req, res, next) => {
  const message = "";

  const activity = await Activity.findById(id);
  try {
    if (!activity) {
      console.log("Activity does not exist");
      message = "Activity year does not exists, Choose another.";
      res.render("add-activity", {
        message: message
      });
    } else {
      const phase = await Phase.findById(req.params.phase_id);
      res.render("edit-phase", {
        activity: activity,
        phase: phase,
        message: message
      });
    }
  } catch (err) {
    next(err);
  }
};

//POST Edit-phase
exports.postEditPhase = async (req, res, next) => {
  var name = req.body.name;
  var slug = name.replace(/\s+/g, "-").toLowerCase();
  var id = req.params.id;

  const phase = await Phase.findOne({
    slug: slug,
    _id: {
      $ne: id
    }
  });
  try {
    if (phase) {
      console.log("Phase already exist");
      message = "Phase name exists, Choose another.";
      res.render("edit-phase", {
        name: name,
        id: id,
        message: message
      });
    } else {
      const sch = await Phase.findById(id);
      try {
        sch.name = name;
        sch.slug = slug;
        sch.save(async (err) => {
          if (err) return console.log(err);

          console.log("Phase Edited success");
          message = "Phase was edited successfully, To view go to phases";
          res.render("edit-phase", {
            name: name,
            id: id,
            message: message
          });
        });
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
};

//  Get delete phase
exports.getDeletePhase = (req, res) => {
  Phase.findByIdAndRemove(req.params.id, async (err) => {
    if (err) return console.log(err);


    res.redirect("/activities-admin");

  });
};