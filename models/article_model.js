var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var articleSchema = new Schema({
	title 	   : { type: String, required: true},
	author 	   : { type: String, required: true},
	edits 	   : [String],
	time  	   : { type : Date, default: Date.now },
	categories : [String]

});

var Article = mongoose.model('Article', articleSchema);


module.exports = Article;

//reduces stock by 1
// menuSchema.methods.updateStock = function () {
// 		this.currentStock--;
// 		return this;
// 	};

//disable an item from the menu
// menuSchema.methods.disabe = function (){
// 	this.currentStock = 0;
// 	return this;
// };

