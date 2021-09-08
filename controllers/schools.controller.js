// const { json } = require("body-parser");
const express = require("express");
const router = express.Router({
  mergeParams: true,
});

// /Import Page model
const School = require("../models/school.model");

const { check, validationResult } = require("express-validator");

// Get all pages indexes
router.get("/", async (req, res, next) => {
  const schools = await School.find();
  try {
    res.render("schools-admin", {
      schools: schools,
    });
  } catch (err) {
    next(err);
  }
});

//GET add Page
router.get("/add-school", (req, res) => {
  res.render("add-school");
});

//POST add school
router.post("/add-school", async (req, res, next) => {
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
          res.redirect("add-school");
        });
      }
    } catch (err) {
      next(err);
    }
 
});

// GET edit page
router.get("/edit-school/:id", async (req, res) => {
  const school = await School.findById(req.params.id);

  try {
    res.render("add-school", {
      name: school.name,
      id: school._id,
    });
  } catch (err) {
    next(err);
  }
});

//POST Edit-school
router.post(
  "/edit-school/:id",
  [
    check("name", "School name is required and must be more than 3 characters.")
      .not()
      .isEmpty()
      .isLength({
        min: 3,
      }),
  ],
  async (req, res) => {
    var name = req.body.name;
    var slug = name.replace(/\s+/g, "-").toLowerCase();
    var id = req.params.id;

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("ERRORS");

      res.render("admin/edit_school", {
        name: "Home | Admin | Edit School",
        errors: errors.array(),
        name: name,
        id: id,
      });
    } else {
      const school = await School.findOne({
        slug: slug,
        _id: {
          $ne: id,
        },
      });
      try {
        if (school) {
          console.log("School already exist");
          req.flash("error", "School slug exists, Choose another.");
          res.render("admin/edit_school", {
            name: "Home | Admin | Edit School",
            name: name,
            id: id,
          });
        } else {
          const cat = await School.findById(id);
          try {
            cat.name = name;
            cat.slug = slug;
            cat.save(async (err) => {
              if (err) return console.log(err);

              const schools = await School.find();
              try {
                req.app.locals.schools = schools;
              } catch (err) {
                console.log(err);
              }

              console.log("School Edited success");
              req.flash("success", "School edited!");
              res.redirect("/admin/schools");
            });
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
);

//  Get delete school
router.get("/delete-school/:id", (req, res) => {
  School.findByIdAndRemove(req.params.id, async (err) => {
    if (err) return console.log(err);

    const schools = await School.find();
    try {
      req.app.locals.schools = schools;
    } catch (err) {
      console.log(err);
    }

    console.log("Delete School success");
    req.flash("success", "School Deleted!");
    res.redirect("/admin/schools");
  });
});

module.exports = router;
