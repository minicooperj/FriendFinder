var path = require("path");

var surveyData = require("../data/friends.js");

var fs = require("fs");

// Your apiRoutes.js file should contain two routes:

module.exports = function(app) {

  // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get("/api/friends", function(req, res){
    res.json(surveyData)
  });
  // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post("/api/friends", function(req, res){
    // declare variable for client request body
    var newResponder = req.body;

    //convert sting to integers for score calculation
    for (i=0; i < newResponder.scores.length; i++) {
      newResponder.scores[i] = parseInt(newResponder.scores[i]);
    }

    // Array captures the calculated scoredifferences for each array friend
    var diffArray = [];

    // logic for calculating compatibility
    // first loop through all friends.js objects
    for (var i = 0; i < surveyData.length; i++){
      var compareFriend = surveyData[i];

      var difference = 0; // set total score difference to zero

      // determine score difference for each friend in array
      for (var j=0; j<compareFriend.scores.length; j++){
          var scoredifference = Math.abs(compareFriend.scores[j] - newResponder.scores[j]);
          difference += scoredifference;
          }

        // Add the score difference to the array in the position of the friends array
          diffArray[i] = difference;
        }

        // use index of diffArray to find matching friend in friends array
        var matchIndex = 0;
        var matchNum = diffArray[0];


        // loop through diffArray and find lowest score index

        for (var i = 1; i < diffArray.length; i++) {
          if (diffArray[i] < matchNum) {
            matchNum = diffArray[i];
            matchIndex = i;
          }
        }

        // push new survey to friends
        surveyData.push(newResponder);


        // return the match from surveyData at position of matchIndex
        res.json(surveyData[matchIndex]);

  });
} // close module.exports
