var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;
var timestamps  = require('mongoose-timestamp');

var articleSchema = new Schema({
title 	   : { type: String, required: true},
_author    : { type: String, required: true},
imageURL   : String,
content    : String,
edits 	   : [String],
created    : { type: Date, required: true, default: Date.now },
categories : [String]
});

var article = mongoose.model('article', articleSchema);
module.exports = article;



// var userSchema = new Schema({
//  email: String,
//  password: String
// });
// var User = mongoose.model("User", userSchema);
// var postSchema = new Schema({
//  imageURL: String,
//  body: String,
//  _author: { type: String, ref: "User" }
// });
// var Post = mongoose.model("Post", postSchema);
// var matt = new User({
//  email: "matt@foo.bar",
//  password: "password"
// })
// new Post({
//  imageURL: "http://images.com/3.jpg",
//  body: "Wow guys, this necklace is amazing!",
//  _author: matt._id
// })
// // later....
// Post.findOne({ imageUrl: "http://images.com/3.jpg" })
//    .populate('_author');
// That post, will now have a post.author attribute, which is the whole user object!