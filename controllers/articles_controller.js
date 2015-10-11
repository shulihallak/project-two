var express = require('express'),
	router  = express.Router(),
	article = require('../models/article_model.js');


/* Article routes */

//Index - all articles
router.get('/', function (req, res, next){
	article.find({}, function (err, articlesArray){
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
	console.log(req.body)
	var newArticle = new article(req.body.article);
	console.log(newArticle);

	newArticle.save(function (err, article){
		if (err) {
			console.log(err);
		} else {
			res.redirect(302, '/articles');
		}
	});
});

//Edit the article
router.get('/:id/edit', function (req, res){
	var articleID = req.params.id;

	article.findOne({
		_id: articleID
	}, function (err, foundArticle) {
		if (err) {
			console.log("ERROR FINDING ARTICLE");
			console.log(err);
		} else {	
			res.render('articles/edit', {
				article: foundArticle
			});
		}
	});
});




//Update edited article - go back to object
// router.patch('/:id', function (req, res, next){
// 	var articleID = req.params.id;
// 	var articleParams = req.body.article;
// });

//if delete is an option - remove single article by ID
// router.delete('/:id', function (req, res, next){

// });

module.exports = router;




