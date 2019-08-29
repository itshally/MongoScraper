//required packages
var  express = require('express'),
     exphbs = require('express-handlebars'),
     // logger = require('morgan'),
     mongoose = require('mongoose'),
     axios = require('axios'),
     cheerio = require('cheerio'),
     PORT = 3000;



// Require all models
     // db = require('./models'),

// Initialize Express
var app = express();

//mongodb connection
mongoose.connect("mongodb://localhost/MongoScraper", {useNewUrlParser:true});


// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Make public a static folder
app.use(express.static("public"));

app.get("/", (request, response) => {
     response.render("index");
});


// Start the server
app.listen(PORT, function() {
     console.log("App listening on port " + PORT);
});
   