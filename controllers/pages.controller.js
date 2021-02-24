exports.getIndex = (req, res, next) => {
    res.render('index');
}
exports.getAbout = (req, res, next) => {
    res.render('about');
}
exports.getActivities = (req, res, next) => {
    res.render('activities');
}