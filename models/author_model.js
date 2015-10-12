var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;

var authorSchema = new Schema({
	name 		: { type: String, required: true},
	username 	: {
		type 	: String,
		trim 	: true
	},
	password: String,
	bio 		: { type: String, maxlength: 1000},
	picture 	: String,
	allArticles : [String]
});



var author = mongoose.model('author', authorSchema);

module.exports = author;