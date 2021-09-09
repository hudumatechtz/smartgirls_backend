// /Import Coacher model
const Coacher = require("../models/coacher.model");

// /Import School model
const School = require("../models/school.model");

// Get all Coachers
exports.getAdminCoachers = async (req, res, next) => {
  const coachers = await Coacher.find();

  try {
    res.render("coachers-admin", {
      coachers: coachers,
    });
  } catch (err) {
    next(err);
  }
};

//GET add Coacher
exports.getAddCoacher = async (req, res) => {
  const message = "";
  const schools = await School.find();
  try {
    res.render("add-coacher", { message: message, schools: schools });
  } catch (err) {
    console.error(err);
  }
};

//POST add coacher
exports.postAddCoacher = async (req, res, next) => {
  var name = req.body.name;
  var slug = name.replace(/\s+/g, "-").toLowerCase();
  var phone = req.body.phone;
  var email = req.body.email;
  var school = req.body.school;

  const schools = await School.find();
  const coacher = await Coacher.findOne({ slug: slug });
  try {
    if (coacher) {
      console.log("Coacher already exist");

      message = "Coacher name exists, Choose another.";
      res.render("add-coacher", { message: message, schools: schools });
    } else {
      var coa = new Coacher({
        name: name,
        slug: slug,
        email: email,
        phone: phone,
        school: school,
      });
      coa.save(async (err) => {
        if (err) return console.log(err);

        console.log("Add coacher success");
        message = "Coacher was posted successfuly, To view go to coachers";
        res.render("add-coacher", { message: message, schools: schools });
      });
    }
  } catch (err) {
    next(err);
  }
};

// GET edit coacher
exports.getEditCoacher = async (req, res, next) => {
  const message = "";
  const schools = await School.find();
  const coacher = await Coacher.findById(req.params.id);

  try {
    res.render("edit-coacher", {
      name: coacher.name,
      email: coacher.email,
      phone: coacher.phone,
      sch: coacher.school.replace(/\s+/g, "-").toLowerCase(),
      schools: schools,
      message: message,
      id: coacher._id,
    });
  } catch (err) {
    next(err);
  }
};

//POST Edit-coacher
exports.postEditCoacher = async (req, res, next) => {
  var name = req.body.name;
  var slug = name.replace(/\s+/g, "-").toLowerCase();
  var phone = req.body.phone;
  var email = req.body.email;
  var school = req.body.school;
  var id = req.params.id;

  const schools = await School.find();
  const coacher = await Coacher.findOne({ slug: slug, _id: { $ne: id } });
  try {
    if (coacher) {
      console.log("Coacher already exist");
      message = "Coacher name exists, Choose another.";
      res.render("edit-coacher", {
        name: name,
        email: email,
        phone: phone,
        sch: school.replace(/\s+/g, "-").toLowerCase(),
        schools: schools,
        id: id,
        message: message,
      });
    } else {
      const coa = await Coacher.findById(id);
      try {
        coa.name = name;
        coa.email = email;
        coa.phone = phone;
        coa.school = school;
        coa.slug = slug;
        coa.save(async (err) => {
          if (err) return console.log(err);

          console.log("Coacher Edited success");
          message = "Coacher was edited successfuly, To view go to coachers";
          res.render("edit-coacher", {
            name: name,
            email: email,
            phone: phone,
            sch: school.replace(/\s+/g, "-").toLowerCase(),
            schools: schools,
            id: id,
            message: message,
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

//  Get delete coacher
exports.getDeleteCoacher = (req, res) => {
  Coacher.findByIdAndRemove(req.params.id, async (err) => {
    if (err) return console.log(err);

    res.redirect("/coachers-admin");
  });
};
