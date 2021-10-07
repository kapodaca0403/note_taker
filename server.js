const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./public/helpers/uuid");
const util = require("util");

const dbJson = require("./db/db.json");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
    } else {
      const parsedData = [].concat(JSON.parse(data));
      console.log(parsedData);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  console.log("testing");
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add note`);

  const { title, text } = req.body;

  if ((title, text)) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };
    console.log(newNote);
    res.json(response);
  } else {
    res.error("Error , please try adding note again");
  }
});

// app.get("/api/notes/:id", (req, res) => {
//   res.json(notes[req.params.id]);
// });

app.delete("/api/notes/:id", (req, res) => {
  readFromFile("./db/db.json")
    .then((data) => {
      const deletedNotes = JSON.parse(data);
      deletedNotes.filter((note) => note.id !== req.params.id);
      console.log(deletedNotes);
      console.log(typeof deletedNotes);
    })
    .then((note) => {
      writeToFile("./db/db.json", note);
    });
});

//   const deleteNote = req.params.id;
//   if (deleteNote !== -1) {
//     data.splice(deleteNote, 1);
//   }
//   res.json(`Note has been deleted`);
// });

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.listen(PORT, () =>
  console.log(`Listening to port http://localhost:${PORT}`)
);
