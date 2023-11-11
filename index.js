const express = require("express");
let app = express();
let http = require('http');
const cors = require("cors");
app.use(cors());
const path = require("path");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

app.use(express.static('views'));

const frontend_questions = require("./questions_frontend.json");
const backend_questions = require("./questions_backend.json");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/views', 'index.html'));
})

app.get("/frontendquestions", (req, res) => {
    res.json(frontend_questions);
})

app.get("/frontendquestions/random", (req, res) => {
    let question = frontend_questions[Math.floor(Math.random()*frontend_questions.length)]

    res.json(question);
})

app.get("/backendquestions", (req, res) => {
    res.json(backend_questions);
})

app.get("/backendquestions/random", (req, res) => {
    let question = backend_questions[Math.floor(Math.random()*backend_questions.length)]

    res.json(question);
})


app.listen(process.env.port || 3000, () => {
    console.log("Server running on port 3000")
})

module.exports = app;
