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

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error":message});
}


// API Routes 

/* "/api/notes/:name"
 *  GET: find all notes related to passed in name 
 *  POST: create a new note for passed in name
 */ 
app.get("/api/notes/:name", function(req, res) {
    var name = req.params.name; // Get name of user from post request to differentiate

    //.find() returns a cursors(pointer to result but times out), use toArray
    db.collection(name + 's_notes').find({}).toArray(function(err, docs) {
        if(err) {
            handleError(res, err.message, "Failed to get notes.")
        } else {
            res.status(200).json(docs);
        }
    });

});

app.post("/api/notes/:name", function(req, res) {
    var name = req.params.name;
    var newNote = req.body;

    if(!req.body.content) {
        handleError(res, "Invalid user input", "Must provide content", 400);
    }

    db.collection(name + 's_notes').insertOne(newNote, function(err, doc) {
        if(err){
            handleError(res, err.message, "Failed to create a new note.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });

});


/* "/api/notes/:name/:id"
 *  GET: find note by id
 *  PUT: update note by id
 *  DELETE: delete note by id
 */
app.get("/api/notes/:name/:id", function(req, res) {
    var name = req.paramas.name;

    db.collection(name + 's_notes').findOne({_id: new ObjectID(req.params.id)}, function(err, doc) {
        if(err) {
            handleError(res, err.message, "Failed to get note");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/api/notes/:name/:id", function(req, res) {
    var name = req.params.name;
    var updateNote = req.body;
    delete updateNote._id;

    db.collection(name + 's_notes').updateOne({_id: new ObjectID(req.params.id)}, updateNote, function(err, doc) {
        if(err) {
            handleError(res, err.message, "Failed to update note")
        } else {
            updateNote._id = req.params.id;
            res.status(200).json(updateNote);
        }
    });
    
})

app.delete("/api/notes/:name/:id", function(req, res) {
    var name = req.params.name;

    db.collection(name + 's_notes').deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete note");
        } else{
            res.status(200).json(req.params.id);
        }
    });
});
