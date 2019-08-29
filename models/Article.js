var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//creating article schema
var ArticleSchema = new Schema({
     headline : {
          type : String,
          required : true
     },
     byline : String,
     summary : String,
     url :String
});

//creating an Article model
var Article = mongoose.model("Article", ArticleSchema);

//exporting model...
module.exports = Article;