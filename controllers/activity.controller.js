// /Import Activity model
const Activity = require("../models/activity.model");



// Get all Activities 
exports.getAdminActivities = async (req, res, next) => {
  const activities = await Activity.find();
  try {
    res.render("activities-admin", {
      activities: activities
    });
  } catch (err) {
    next(err);
  }
};



//GET add Activity
exports.getAddActivity = (req, res) => {
  const message = "";
  res.render("add-activity", { message: message });
};

//POST add activity
exports.postAddActivity = async (req, res, next) => {
  var year = req.body.year;
  

    const activity = await Activity.findOne({ year: year });
    try {
      if (activity) {
        console.log("Activity already exist");
        message = "Activity year exists, Choose another.";
        res.render("add-activity", { message: message });
      } else {
        var act = new Activity({
          year: year
        });
        act.save(async (err) => {
          if (err) return console.log(err);

          console.log("Add activity success");
          message = "Activity was posted successfully, To view go to activities";
          res.render("add-activity", { message: message });
        });
      }
    } catch (err) {
      next(err);
    }
};

// GET edit activity
exports.getEditActivity = async (req, res, next) => {
  const message = "";
  const activity = await Activity.findById(req.params.id);

  try {
    res.render("edit-activity", {
      year: activity.year,
      id: activity._id,
      message: message
    });
  } catch (err) {
    next(err);
  }
};

//POST Edit-activity
exports.postEditActivity = async (req, res, next) => {
    var year = req.body.year;
    var id = req.params.id;

    const activity = await Activity.findOne({ year: year, _id: { $ne: id } });
    try {
      if (activity) {
        console.log("Activity already exist");
        message = "Activity year exists, Choose another.";
        res.render("edit-activity", {
          year: year,
          id: id,
          message: message
        });
      } else {
        const act = await Activity.findById(id);
        try {
          act.year = year;
          act.save(async (err) => {
            if (err) return console.log(err);

            console.log("Activity Edited success");
            message = "Activity was edited successfully, To view go to activities";
            res.render("edit-activity", { year: year, id: id, message: message });
          });
        } catch (err) {
          next(err);
        }
      }
    } catch (err) {
      next(err);
    }
  };

//  Get delete activity
exports.getDeleteActivity = (req, res) => {
  Activity.findByIdAndRemove(req.params.id, async (err) => {
    if (err) return console.log(err);

    
      res.redirect("/activities-admin");
    
  });
};
