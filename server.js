// Server Dependencies
var express = require('express');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// instantiating Express
var app = express();

var PORT = 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// MongoDB Config
mongoose.connect("mongodb://127.0.0.1/articles");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});