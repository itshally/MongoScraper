const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

//creating schema for the articles
const ArticleSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  link : {
    type : String,
    required : true
  },
  saved : {
    type : Boolean,
    default : false
  },
  note: [
    {
      type : Schema.Types.ObjectId,
      ref : 'Note'
    }
  ]
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
