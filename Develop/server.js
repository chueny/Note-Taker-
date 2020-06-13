const express = require("express");
const bodyParser = require ("body-parser");
const path = require("path");
const fs = require('fs');
const util = require('util');
const { response } = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// const data = fs.readFileSync(path.join(__dirname, "/db/db.json"), 'utf-8');
// const db = JSON.parse(data);
// console.log(db);


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
    //let newNote= req.body;
    //  let data2 = res.json(data);
    //   // console.log("API GET: notes is working"+ newNote);
    //  console.log("API GET: notes is working"+ data);
   
  });
 
  app.post("/api/notes", function(req, res) {
    
    let newNote= req.body;
    db.push(newNote);
    //let data = JSON.stringify(newNote);

    // fs.writeFile('db.json', newNote, finished);
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