var express = require('express'),
	router  = express.Router(),
	author = require('../models/author_model.js');


/* Author routes */

//Index - all authors
router.get('/', function (req, res, next){
	author.find({}, function (err, authorsArray){
		if (err) {
			console.log(err);
		} else {
			res.render('authors/index', {
				authors: authorsArray
			});
		};
	});
});

//New author - show form
router.get('/new', function (req, res, next){
	res.render('authors/new');
});

//Create author
router.post('/', function (req, res, next){
	console.log(req.body)
	var newAuthor = new author(req.body.author);
	console.log(newAuthor);

	newAuthor.save(function (err, author){
		if (err) {
			console.log(err);
		} else {
			res.redirect(302, '/authors');
		}
	});
});

//show the author 
router.get('/show/:id', function (req, res){
	var authorID = req.params.id;

	author.findById(authorID, function (err, foundAuthor){
		if (err){
			return err;
		} else {
			res.render('authors/show', {
				author: foundAuthor
			});
		}
	});
});

//Edit the author form
router.get('/:id/edit', function (req, res){
	var authorID = req.params.id;

	author.findById(authorID, function (err, foundAuthor){
		if (err) {
			console.log('something broke', err);
		} else {
			res.render('authors/edit', {
				author: foundAuthor
			});
		}
	});
});

//Update author object
router.patch('/:id', function (req, res){
	var authorID = req.params.id;
	var authorParams = req.body.author;

	author.findByIdAndUpdate(authorID, authorParams, function (err, updatedAuthor) {
		if (err) {
			console.log(err);
		} else {
			res.redirect(302, '/authors');
		}
	});
});


//delete author
router.delete('/:id', function (req, res){
	var authorID = req.params.id;

	author.findByIdAndRemove(authorID, function (err){
		if (err){
			console.log(err);
		} else {
			res.redirect(302, '/authors');
		} 
	});
});


module.exports = router;



