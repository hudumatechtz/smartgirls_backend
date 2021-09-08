// const { json } = require("body-parser");
const express = require("express");
const router = express.Router({
  mergeParams: true,
});

// /Import Page model
const School = require("../models/school.model");

const { check, validationResult } = require("express-validator");

// Get all pages indexes
router.get("/", async (req, res) => {
  const categories = await School.find();
  try {
    res.render("admin/categories", {
      title: "Home | Admin | Categories",
      categories: categories,
    });
  } catch (err) {
    console.log(err);
  }
});

//GET add Page
router.get("/add-category", (req, res) => {
  var cat_title = "";

  res.render("admin/add_category", {
    title: "Home | Admin | Add School",
    cat_title: cat_title,
  });
});

//POST add category
router.post(
  "/add-category",
  [
    check(
      "cat_title",
      "School name is required and must be more than 3 characters."
    )
      .not()
      .isEmpty()
      .isLength({
        min: 3,
      }),
  ],
  async (req, res) => {
    var cat_title = req.body.cat_title;
    var slug = cat_title.replace(/\s+/g, "-").toLowerCase();

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("ERRORS");

      res.render("admin/add_category", {
        title: "Home | Admin | Add School",
        errors: errors.array(),
        cat_title: cat_title,
      });
    } else {
      const category = await School.findOne({ slug: slug });
      try {
        if (category) {
          console.log("School already exist");
          req.flash("error", "School title exists, Choose another.");
          res.redirect("back");
        } else {
          var cat = new School({
            title: cat_title,
            slug: slug,
          });
          cat.save(async (err) => {
            if (err) return console.log(err);

            const categories = await School.find();
            try {
              req.app.locals.categories = categories;
            } catch (err) {
              console.log(err);
            }

            console.log("Add category success");
            req.flash("success", "School added!");
            res.redirect("/admin/categories");
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
);

// GET edit page
router.get("/edit-category/:id", async (req, res) => {
  const category = await School.findById(req.params.id);

  try {
    res.render("admin/edit_category", {
      title: "Home | Admin | Edit School",
      cat_title: category.title,
      id: category._id,
    });
  } catch (err) {
    console.log(err);
  }
});

//POST Edit-category
router.post(
  "/edit-category/:id",
  [
    check(
      "cat_title",
      "School name is required and must be more than 3 characters."
    )
      .not()
      .isEmpty()
      .isLength({
        min: 3,
      }),
  ],
  async (req, res) => {
    var cat_title = req.body.cat_title;
    var slug = cat_title.replace(/\s+/g, "-").toLowerCase();
    var id = req.params.id;

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("ERRORS");

      res.render("admin/edit_category", {
        title: "Home | Admin | Edit School",
        errors: errors.array(),
        cat_title: cat_title,
        id: id,
      });
    } else {
      const category = await School.findOne({
        slug: slug,
        _id: {
          $ne: id,
        },
      });
      try {
        if (category) {
          console.log("School already exist");
          req.flash("error", "School slug exists, Choose another.");
          res.render("admin/edit_category", {
            title: "Home | Admin | Edit School",
            cat_title: cat_title,
            id: id,
          });
        } else {
          const cat = await School.findById(id);
          try {
            cat.title = cat_title;
            cat.slug = slug;
            cat.save(async (err) => {
              if (err) return console.log(err);

              const categories = await School.find();
              try {
                req.app.locals.categories = categories;
              } catch (err) {
                console.log(err);
              }

              console.log("School Edited success");
              req.flash("success", "School edited!");
              res.redirect("/admin/categories");
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

//  Get delete category
router.get("/delete-category/:id", (req, res) => {
  School.findByIdAndRemove(req.params.id, async (err) => {
    if (err) return console.log(err);

    const categories = await School.find();
    try {
      req.app.locals.categories = categories;
    } catch (err) {
      console.log(err);
    }

    console.log("Delete School success");
    req.flash("success", "School Deleted!");
    res.redirect("/admin/categories");
  });
});

module.exports = router;
