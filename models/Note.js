var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//creating note schema
var NoteSchema = new Schema({
     title : {
          type : String,
          required : true
     },
     body : String
});

//creating a note model
var Note = mongoose.model("Note", NoteSchema);

//exporting model...
module.exports = Note;

