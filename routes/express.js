const express = require("express");
const notesData = require("./assets/js/index.js");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
app.get("/index", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.get("/db", (req, res) => res.sendFile(path.join(__dirname, "/db/db.json")));

// adding a status for how many notes have been added???
app.get("/api/notes/:notes_id", (req, res) => {
  res.json(notes[req.params.notes_id]);
  res.status().json(notes);
});

//let addedNotes= [];

app.get("/api/notes", (req, res) => {
  res.json(`${req.method} request to add notes`);

  console.info(`${req.method} request to add notes`);
  return res.json(notes);
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request to add notes`);

  const { noteTitle, noteText } = req.body;

  if (noteTitle && noteText && noteList) {
    const addNote = {
      noteTitle,
      noteText,
      review_id: uuid(),
    };

    const newNote = JSON.stringify(addNote);

    fs.writeFile(`./db/${addNote.note}.json`, newNote, (err) =>
      err
        ? console.error(err)
        : console.log(`Note ${addNote.note} has been added`)
    );
    const response = {
      status: "success",
      body: newReview,
    };

    let response;

    if (req.body && req.body.product) {
      response = {
        status: "success",
        data: req.body,
      };
    }
    res.json(`Notes ${response.data.product} has been added`);
  } else {
    res.json("Please add context to notes");
  }
  console.log(req.body);
});

app.delete("/api/notes/:notes_id", (req, res) => {
  const deleteNote = notes(req.params.id, notes);
  if (deleteNote !== -1) {
    notes.splice(deletedNote, 1);
  }
  res.json(`Note has been deleted`);
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
