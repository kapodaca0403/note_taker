const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
app.get("/index", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.get("/db", (req, res) => res.sendFile(path.join(__dirname, "/db/db.json")));

// adding a status for how many notes have been added???
app.get("/api/notes", (req, res) => {
  res.status().json(notes);
});

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request to add notes`);
  return res.json(notes);
});
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request to add notes`);

  const { noteTitle, noteText, noteList } = req.body;
  if (noteTitle && noteText && noteList) {
    const addNote = {
      noteTitle,
      noteText,
      noteList,
    };
    const newNote = JSON.stringify(addNote);
    fs.writeFile(`./db/${addNote.note}.json`, newNote);
  }

  let response;
  if (req.body && req.body.product) {
    response = {
      status: "success",
      data: req.body,
    };
    res.json(`Notes ${response.data.product} has been added`);
  } else {
    res.json("Please add context to notes");
  }
  console.log(req.body);
});

app.delete("/api/delete", (req, res) => {});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
