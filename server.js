var express = require('express'),
     exphbs = require('express-handlebars'),
     logger = require('morgan'),
     mongoose = require('mongoose'),
     axios = require('axios'),
     cheerio = require('cheerio'),

// Require all models
     db = require('./models'),

     PORT = 3000;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));

// Make public a static folder
app.use(express.static("public"));

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: false  }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
}
else {
	// Connect to the Mongo DB with sample database
     mongoose.connect("mongodb://localhost/unit19", { useNewUrlParser: true });

};


// app.use(express.static(path.join(__dirname, '/app/public')));

app.get('/', (request, response) => {
    db.Article.find({}, (err, data) =>{
     response.render("index", {articles: data});
    })
});

// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
     // First, we grab the body of the html with axios
     axios.get("https://thoughtcatalog.com/category/self-improvement/").then(function(response) {
       // Then, we load that into cheerio and save it to $ for a shorthand selector
       var $ = cheerio.load(response.data);
   
       // Now, we grab every h2 within an article tag, and do the following:
       $("article h1").each(function(i, element) {

          var result = {};

          result.headline = $(this).text().trim();
          result.url = $(this).children("a").attr("href");

          // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
      .then(function(dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });

      
      });
       // Send a message to the client
     //   res.send("Scrape Complete");
     });
   });
   

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
     // Grab every document in the Articles collection
     db.Article.find({})
     .then(function(dbArticle) {
     // If we were able to successfully find Articles, send them back to the client
     res.json(dbArticle);
     })
     .catch(function(err) {
     // If an error occurred, send it to the client
     res.json(err);
     });
});
   


// Start the server
app.listen(PORT, function() {
     console.log("App listening on port " + PORT);
});
   