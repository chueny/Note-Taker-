const express = require("express");  //web server access to browser
const path = require("path"); //library access folder structure
const fs = require('fs'); 
const { v4: uuidv4 } = require('uuid'); //library that generates random id 

const app = express(); //var app and let it be object of express
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true })); //treats special characters in URL
app.use(express.json()); //use this library or body parser to handle JSON
app.use(express.static("public"));

function dbFromFile(){
   return JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"), 'utf8'))
};

function dbToFile(db){
  fs.writeFile('./db/db.json', JSON.stringify(db), function (err) {
    if (err) return console.log(err);
    console.log('wrote to db');});
};


//HTML ROUTES ==========================================================
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  console.log("Notes is working!");
});

app.get("/db", function(req, res) {
  let db = dbFromFile();
  return res.json(db);
});



//API ROUTES =========================================================
app.get("/api/notes", function(req, res) {
  //return data to user
  let db = dbFromFile();
  return res.json(db); 
});
 

app.post("/api/notes", function(req, res) {
  //recieve a new note to save on the request body, add to db.json file
  //and return the new note to client
  let db = dbFromFile();

  const {title, text} = req.body;
  const newNote = {
    id: uuidv4(),
    title, 
    text,
  };
    
  db.push(newNote);
  dbToFile(db);
});
    

app.delete("/api/notes/:id", function(req, res) {
  //delete a note base on id
  //read current db and read it

  let db = dbFromFile();

  const foundNote = db.findIndex((note) => note.id === (req.params.id));
  db.splice(foundNote, 1);

  dbToFile(db);
  res.send(db);

});


//HTML routes with defaults, "*" order matters, if gets run before other routes/api, then it defaults
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  console.log("HTML Route: * is working!");
});


//Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});