var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;

var authorSchema = new Schema({
	name 		: { type: String, required: true},
	username 	: {
		type 	: String,
		trim 	: true,
		
	},
	stories     : [{ type: Schema.ObjectId, ref: 'article' }],
	password 	: { type: String},
	bio 		: { type: String, maxlength: 1000}
	
});



var author = mongoose.model('author', authorSchema);

module.exports = author;