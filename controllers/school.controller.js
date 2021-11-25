// /Import School model
const School = require("../models/school.model");



// Get all Schools 
exports.getAdminSchools = async (req, res, next) => {
  const schools = await School.find();
  try {
    res.render("schools-admin", {
      schools: schools
    });
  } catch (err) {
    next(err);
  }
};



//GET add School
exports.getAddSchool = (req, res) => {
  const message = "";
  res.render("add-school", { message: message });
};

//POST add school
exports.postAddSchool = async (req, res, next) => {
  var name = req.body.name;
  var slug = name.replace(/\s+/g, "-").toLowerCase();

    const school = await School.findOne({ slug: slug });
    try {
      if (school) {
        console.log("School already exist");
        message = "School name exists, Choose another.";
        res.render("add-school", { message: message });
      } else {
        var sch = new School({
          name: name,
          slug: slug,
        });
        sch.save(async (err) => {
          if (err) return console.log(err);

          console.log("Add school success");
          message = "School was posted successfuly, To view go to schools";
          res.render("add-school", { message: message });
        });
      }
    } catch (err) {
      next(err);
    }
};

// GET edit school
exports.getEditSchool = async (req, res, next) => {
  const message = "";
  const school = await School.findById(req.params.id);

  try {
    res.render("edit-school", {
      name: school.name,
      id: school._id,
      message: message
    });
  } catch (err) {
    next(err);
  }
};

//POST Edit-school
exports.postEditSchool = async (req, res, next) => {
    var name = req.body.name;
    var slug = name.replace(/\s+/g, "-").toLowerCase();
    var id = req.params.id;

    const school = await School.findOne({ slug: slug, _id: { $ne: id } });
    try {
      if (school) {
        console.log("School already exist");
        message = "School name exists, Choose another.";
        res.render("edit-school", {
          name: name,
          id: id,
          message: message
        });
      } else {
        const sch = await School.findById(id);
        try {
          sch.name = name;
          sch.slug = slug;
          sch.save(async (err) => {
            if (err) return console.log(err);

            console.log("School Edited success");
            message = "School was edited successfully, To view go to schools";
            res.render("edit-school", { name: name, id: id, message: message });
          });
        } catch (err) {
          next(err);
        }
      }
    } catch (err) {
      next(err);
    }
  };

//  Get delete school
exports.getDeleteSchool = (req, res) => {
  School.findByIdAndRemove(req.params.id, async (err) => {
    if (err) return console.log(err);

    
      res.redirect("/schools-admin");
    
  });
};
