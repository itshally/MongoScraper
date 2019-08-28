var express = require("express"),
     exphbs = require("express-handlebars"),
     logger = require("morgan"),
     mongoose = require("mongoose"),
     axios = require("axios"),
     cheerio = require("cheerio"),

// Require all models
     db = require("./models"),

     PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Make public a static folder
app.use(express.static("public"));

// Start the server
app.listen(PORT, function() {
     console.log("App listening on port " + PORT);
});
   