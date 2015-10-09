var mongoose = require('mongoose'),
	Schema = mongoose.Schema;



var authorSchema = new Schema({
	name: { type: String, required: true},
	email: String,
	password: String,
	allArticles: [String]
});



var Author = mongoose.model('Author', authorSchema);

module.exports = Author;