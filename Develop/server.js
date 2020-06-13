const express = require("express");
const bodyParser = require ("body-parser");
const path = require("path");
const fs = require('fs');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); // middleware for parsing JSON files
app.use(express.urlencoded({ extended: true })); // something about URL encoding???
app.use(express.json()); // ???
app.use(express.static("public")); //allows us to access files in public directory

let db = [JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"), 'utf8'))];
//const dbFile = fs.readFileSync(path.join(__dirname, "./db/db.json"), 'utf-8');
//let db = JSON.parse(dbFile);
console.log("checking what is stored in the db object: " + JSON.stringify(db)); //not working yet.


//HTML ROUTES ==========================================================
app.get("/notes.html", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  console.log("Notes is working!");
});

app.get("/db", function(req, res) {
  return res.json(db);
});

app.get("*", function(req, res) {
 res.sendFile(path.join(__dirname, "/public/index.html"));
 console.log("HTML Route: * is working!");
});

//API ROUTES =========================================================
  app.get("/api/notes", function(req, res) {
    //should read the db.json file and return all saved notes as JSON
    let newNote= req.body;
     console.log("API GET: notes is working"+ newNote);
   
  });
 
  app.post("/api/notes", function(req, res) {
    //should recieve a new note to save on the request body, add to db.json sfile and return
    //the new note to client

    let newNote= req.body;
    db.push(newNote);

    console.log("data is: " + JSON.stringify(newNote));
    
    //fs.writeFile('db.json', newNote, finished);

    fs.writeFile('./db/db.json', JSON.stringify(db), function (err) {
      if (err) return console.log(err);
      console.log('wrote to db');
    });
    // function finished (err){
    //   console.log('all set');
    // }
    //and then return thenew note to the client);
    
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