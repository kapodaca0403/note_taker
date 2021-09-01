const express = require("express");
const path = require("path");
const fs = require("fs");
//const uuid = require("./helpers/uuid");

const app = express();
const PORT = 3001;
//let addingNotes = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

// adding a status for how many notes have been added???
//let notes = [];
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

let notes = [];
app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, notes) => {
    err ? console.error(err) : console.log(JSON.parse(notes));
  });
  res.json(notes);
});

//app.get("/api/notes", (req, res) => {
//console.info(`${req.method} request to add notes`);
//return res.json(notes);
//});

app.post("/api/notes", (req, res) => {
  const addNote = req.body;
  notes.push(addNote).addNote;
  fs.writeFile("db/db.json", "utf-8", (err, addNote) => {
    err ? console.error(err) : console.log(JSON.stringify(addNote));
  });
  res.json(notes);
});
// let newNote;

//if (req.body && req.body.product) {
//const response = {
//status: "success",
//data: req.body,
//};
//res.json(`Notes ${response.data.product} has been added`);
//} else {
//res.json("Please add context to notes");
//}
//console.log(req.body);
//});

app.get("/api/notes/:id", (req, res) => {
  res.json(notes[req.params.notes_id]);
});

app.delete("/api/notes/:id", (req, res) => {
  const deleteNote = notes(req.params.id, notes);
  if (deleteNote !== -1) {
    notes.splice(deletedNote, 1);
  }
  res.json(`Note has been deleted`);
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
