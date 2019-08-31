const mongoose = require("mongoose");
	 Schema = mongoose.Schema;

//creating a schema for notes
const NoteSchema = new Schema({
  body : {
	type: String,
	required : true
  }
});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
