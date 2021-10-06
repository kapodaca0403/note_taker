const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./public/helpers/uuid");
const util = require("util");

const dbJson = require("./db/db.json");

const app = express();

const PORT = process.env.PORT || 3001;

const readFromFile = util.promisify(fs.readFile);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    console.log(data);
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a tip`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added`);
  } else {
    res.error("Error , please try adding note again");
  }
});

// DELETE NOTE???
// app.get("/api/notes/:id", (req, res) => {
//   res.json(notes[req.params.id]);
// });

// app.delete("/api/notes/:id", (req, res) => {
//   const deleteNote = notes(req.params.id, notes);
//   if (deleteNote !== -1) {
//     notes.splice(deleteNote, 1);
//   }
//   res.json(`Note has been deleted`);
// });
app.listen(PORT, () =>
  console.log(`Listening to port http://localhost:${PORT}`)
);
