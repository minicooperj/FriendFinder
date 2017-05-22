var path = require('path');

// Your htmlRoutes.js file should include two routes:
module.exports = function(app) {

// A GET Route to /survey which should display the survey page.
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

// A default USE route that leads to home.html which displays the home page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});
} // close module.exports