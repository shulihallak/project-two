var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;

var userSchema = new Schema({
	fullName 	: { type: String, required: false},
	username 	: { type: String,},
	password 	: { type: String, required: false},
	stories     : [{ type: Schema.ObjectId, ref: 'article' }],
	
	bio 		: { type: String, maxlength: 1000}
	
});



var user = mongoose.model('user', userSchema);

module.exports = user;