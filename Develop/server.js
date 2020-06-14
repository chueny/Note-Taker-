const express = require("express");
const bodyParser = require ("body-parser");
const path = require("path");
const fs = require('fs');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json()); // middleware for parsing JSON files
app.use(express.urlencoded({ extended: true })); // something about URL encoding???
app.use(express.json()); // ???
app.use(express.static("public")); //allows us to access files in public directory

let db = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"), 'utf8'));
console.log("checking what is stored in the db object: " + JSON.stringify(db)); //not working yet.


//HTML ROUTES ==========================================================
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  console.log("Notes is working!");
});

app.get("/db", function(req, res) {
  return res.json(db);
});

// app.get("*", function(req, res) {
//  res.sendFile(path.join(__dirname, "/public/index.html"));
//  console.log("HTML Route: * is working!");
// });

//API ROUTES =========================================================
  app.get("/api/notes", function(req, res) {
    //return data to user
    return res.json(db); 
  });
 
  app.post("/api/notes", function(req, res) {
    //should recieve a new note to save on the request body, add to db.json file
    //and return the new note to client
    const {title, text} = req.body;
    const newNote = {
      id: db.length + 1,
      title, 
      text,
    };
    
    db.push(newNote);
    
    fs.writeFile('./db/db.json', JSON.stringify(db), function (err) {
      if (err) return console.log(err);
      console.log('wrote to db');
    });
    
  });
    
  app.delete("/api/notes/:id", function(req, res) {
    //need a .filter() or look at notes 
    //const filtered = notes.filter(function(id){
    // return item.id! == "value that is searched";
    //}); 

    //res.render('test', {output:req.params.id});
    res.send('Got a DELETE request at /user');
    console.log("API Delete: is working");
  });


//Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});