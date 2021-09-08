// const { json } = require("body-parser");
const express = require("express");
const router = express.Router({
  mergeParams: true,
});

// /Import School model
const School = require("../models/school.model");



// Get all pages indexes
router.get("/schools-admin"); 

exports.getAdminSchools = async (req, res, next) => {
  const schools = await School.find();
  try {
    res.render("schools-admin", {
      schools: schools,
    });
  } catch (err) {
    next(err);
  }
};



//GET add Page
router.get("/schools-admin/add-school");
exports.getAddSchools = (req, res) => {
  res.render("add-school");
};

//POST add school
router.post("/schools-admin/add-school");
exports.postAddSchools = async (req, res, next) => {
  var name = req.body.name;
  var slug = name.replace(/\s+/g, "-").toLowerCase();

    const school = await School.findOne({ slug: slug });
    try {
      if (school) {
        console.log("School already exist");
        message = "School name exists, Choose another.";
        res.redirect("back");
      } else {
        var sch = new School({
          name: name,
          slug: slug,
        });
        sch.save(async (err) => {
          if (err) return console.log(err);

          console.log("Add school success");
          message = "School was posted successfuly, To view go to schools";
          res.redirect("back");
        });
      }
    } catch (err) {
      next(err);
    }
};

// GET edit page
router.get("/schools-admin/edit-school/:id");
exports.getEditSchools = async (req, res, next) => {
  const school = await School.findById(req.params.id);

  try {
    res.render("edit-school", {
      name: school.name,
      id: school._id,
    });
  } catch (err) {
    next(err);
  }
};

//POST Edit-school
router.post("/schools-admin/edit-school/:id");
exports.postEditSchools = async (req, res, next) => {
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
        });
      } else {
        const sch = await School.findById(id);
        try {
          sch.name = name;
          sch.slug = slug;
          sch.save(async (err) => {
            if (err) return console.log(err);

            console.log("School Edited success");
            message = "School was edited successfuly, To view go to schools";
            res.redirect("back");
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
router.get("/schools-admin/delete-school/:id");
exports.getDeleteSchools = (req, res) => {
  School.findByIdAndRemove(req.params.id, async (err) => {
    if (err) return console.log(err);

    const schools = await School.find();
    try {
      message = "School was deleted successfuly";
      res.render("schools-admin", {
        schools: schools,
        message: message,
      });
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = router;
