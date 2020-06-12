var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const fs = require('fs');
// let noteData = require("../data/noteData"); 
// let rawData = fs.readFileSync("..db/db.json");
// let notes = JSON.parsel(rawData);

//PORT LISTING 
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

//HTML ROUTES ==========================================================
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./notes.html"));///../notes.html
  console.log("HTML Route: Notes is working!");
});

app.get("/db", function(req, res) {
  res.sendFile(path.join(__dirname, "./notes.html"));
  console.log("HTML Route: Database is working!");
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./index.html")); //"/../index.html"
  console.log("HTML Route: * is working!");
});


//API ROUTES =========================================================
  app.get("/api/notes", function(req, res) {
    //should read the db.json file and return all saved notes as JSON
    res.json(data);
    console.log("API GET: notes is working");

  });
 
  app.post("/api/notes", function(req, res) {
    //SHOULD recieve a new note to save to the request body, add it to db.json 
    //and then return thenew note to the client);
    console.log("API Post: notes is working");
  });
    
  app.delete("/api/notes/:id", function(req, res) {
    //need a .filter() or look at notes 
    //const filtered = notes.filter(function(id){
    // return item.id! == "value that is searched";
    //}); 
    console.log("API Delete: is working");
  });


