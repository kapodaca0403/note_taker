const express = require("express");
const path = require("path");
const fs = require("fs");
//const uuid = require("./helpers/uuid");

const app = express();
const PORT = 3001;
//let addingNotes = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("public")));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//app.get("/api/notes", (req, res) => {
//res.sendFile(path.join(__dirname, "/db/db.json"));
//});

fs.readFile("./db/db/json", "utf-8", (err, notes) => {
  err ? console.error(err) : console.log(JSON.parse(notes));
});

// adding a status for how many notes have been added???
let notes = [];

//let addedNotes= [];
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//app.get("/api/notes", (req, res) => {
//console.info(`${req.method} request to add notes`);
//return res.json(notes);
//});

app.post("/api/notes", (req, res) => {
  const addNote = {};
  addNote.body = req.body.addNote;
  notes.push(addNote).addNote;
  fs.writeFile(".db/db/json", "utf-8", (err, notes) => {
    err ? console.error(err) : console.log(JSON.stringify(notes));
  });
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
