exports.getIndex = (req, res, next) => {
  res.render("home");
};
exports.getAbout = (req, res, next) => {
  res.render("about");
};
exports.getActivities = (req, res, next) => {
  res.render("activities");
};
exports.getWorkforce = (req, res, next) => {
  res.render("workforce");
};

exports.getDashboard = (req, res, next) => {
  res.render("dashboard");
};
