var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var KIM_NOTES = "kimnotes";
var CHESTER_NOTES = "chesternotes";

var app = express();
app.use(bodyParser.json());

var db;

// Connect to the database
mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
    if(err) {
        console.log(err);
        process.exit(1);
    }
    db = database;
    console.log("Database connection ready");

    // Initialize app
    var server = app.listen(process.env.PORT || 8080, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
    });

    // Create link to Angular build directory
    app.use(express.static(__dirname + '/dist'));
});

