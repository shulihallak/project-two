var express = require('express'),
	router  = express.Router(),
	Article = require('../models/article_model.js');


/* Article routes */

//Index - all articles
router.get('/', function (req, res, next){
	Article.find({}, function (err, articlesArray){
		if (err) {
			console.log(err);
		} else {
			res.render('articles/index', {
				articles: articlesArray
			});
		};
	});
});

//New article - show form
router.get('/new', function (req, res, next){
	res.render('articles/new');
});

//Create arcticle
router.post('/', function (req, res, next){
	var newArticle = new Article(req.body.Article);
	console.log(newArticle);

	newArticle.save(function (err, article){
		if (err) {
			console.log(err);
		} else {
			res.redirect(302, '/articles');
		}
	});
});

//Show the article
router.get('/:id', function (req, res, next){

});

//Edit single article - show form
router.get('/:id/edit', function (req, res, next){

});

//Update edited article - go back to object
router.patch('/:id', function (req, res, next){

});

//if delete is an option - remove single article by ID
router.delete('/:id', function (req, res, next){

});

module.exports = router;



