//required packages
var  express = require('express'),
     exphbs = require('express-handlebars'),
     logger = require('morgan'),
     mongoose = require('mongoose'),
     axios = require('axios'),
     cheerio = require('cheerio'),
     request = require('request'),
     db = require('./models'),
     port = process.env.PORT || 3000;

// Initialize Express
var app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false  }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

//processing the database connection
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect("mongodb://localhost/MongoScraperDB", { useNewUrlParser: true });
};

//rendering the home page with the articles
app.get('/', (request, response) => {
  db.Article.find({})
  .sort({ _id: 1 })
  .populate('note')
    .then((data) => {
      let article = {
        article: data
      };
      response.render('index', article);
    });
});


// --------------------------- SCRAPING ARTICLE ---------------------------
//requesting data to scrape
app.get('/scrape', (req, res) => {
     request("https://thoughtcatalog.com/category/self-improvement/", function (err, response, html) {
       const $ = cheerio.load(html);   
       $(".tcf-article-md-title").each(function(i, element) {

          var result = {};
          //getting the title 
          result.title = $(this).find('h1').text().trim();
          //getting the link
          result.link = $(this).find("a").attr("href");

          //saving the a new data to the database
          db.Article.create(result).then((data) => {
            console.log(data);
          }).catch((error) => { console.log(error); });
      });
    console.log('Done');
    res.redirect('/');
  });
});

//api page for the articles
app.get('/api/articles', (request, response) => {
  db.Article.find({})
    .then(function(article) {
      response.json(article);
    }).catch((error) => { response.json(error); });
});

//getting scraped data by id from the database
app.get('/articles/:id', (request, response) => {
  db.Article.findOne({ _id: request.params.id })
    .then((article) => {
      response.json(article);
    }).catch((error) => { response.json(error); });
});
   

//--------------------------- SAVING/UNSAVING ARTICLES ---------------------------
//getting saved articles from the api path
app.get('/api/saved', (request, response) => {
  db.Article.find({ saved: true })
    .then((result) => {
      response.json(result);
    }).catch((error) => { response.json(error); });
});

//getting all saved data to display on the page
app.get('/saved', (request, response) => {
  db.Article.find({ saved: true })
    .then((article) => {
      const saved = {
        article: article
      };
      response.render('saved', saved);
    }).catch((error) => { response.json(error); });
});

//post article by id to save to the api
app.post('/api/saved/:id', (request, response) => {
  db.Article.findOneAndUpdate({ _id: request.params.id }, { saved: true })
    .then((article) => {
      response.json(article);
    }).catch((error) => { response.json(error); });
});

//is used for removing the article from the saved api
app.post('/api/removed/:id', (request, response) => {
  db.Article.findOneAndUpdate({ _id: request.params.id }, { saved: false })
    .then((article) => {
      response.json(article);
    }).catch((error) => { response.json(error); });
});


// --------------------------- NOTES FOR AN ARTICLE ---------------------------
//getting the notes to display from its API
app.get('/notes', (request, response) => {
  db.Note.find({}).then((notes) => {
    response.json(notes);
  }).catch((error) => { response.json(error); });
}); 

//this is where the note's id will be based
app.get('/articles/:id', (request, response) => {
  db.Article.findOne({ _id: request.params.id })
    .populate('note')
    .then((result) => {
      response.json(result);
    }).catch((error) => { response.json(error); });
});

//posting notes 
app.post('/notes/:id', (request, response) => {
  db.Note.create(request.body).then((addNote) => {
    return db.Article.findOneAndUpdate({ _id : request.params.id },{ $push : { note : addNote._id } },
      { new : true });
  }).then((result) => {
    response.json(result);
  }).catch((error) => { response.json(error); });
});

//delete notes
app.delete('/notes/:id', (request, response) => {
  db.Note.deleteOne({ _id: request.params.id })
    .then(function(result) {
      response.json(result);
    }).catch((error) => { response.json(error); });
});

// Start the server
app.listen(port, function() {
     console.log("App listening on port " + port);
});
   