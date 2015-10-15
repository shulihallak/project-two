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
	
	res.render('articles/new', {
		currentUser: req.session.user
	});
});

//Create arcticle
router.post('/', function (req, res, next){
	req.body.article.author = req.session.currentUser;

	// req.session.currentUser <~ is the user object.
	console.log(req.body)
	var newArticle = new article(req.body.article);
	console.log(newArticle);

	newArticle.save(function (err, article){

		if (err) {
			console.log(err);
		} else {
			console.log(article);
			res.redirect(302, '/articles');
		}
	});
});



//show the article 
router.get('/show/:id', function (req, res){
	var articleID = req.params.id;

	article.findById(articleID)
		.populate('_author')
		.exec(function (err, foundArticle){

		console.log(err, foundArticle);

		if (err){
			return err;
		} else {
			res.render('articles/show', {
				article: foundArticle,
				currentUser: req.session.user
			});
		}
	});
});

//Edit the article
router.get('/:id/edit', function (req, res){
	var articleID = req.params.id;

	

	article.findById(articleID, function (err, foundArticle){
		if (err) {
			console.log('something broke', err);
		} else {
			res.render('articles/edit', {
				article: foundArticle,
				currentUser: req.session.user

			});
		}
	});
});

router.patch('/:id', function (req, res){
	var articleID = req.params.id;
	var articleParams = req.body.article;
	articleParams.updatedAt = new Date();


	article.findByIdAndUpdate(articleID, articleParams, function (err, updatedArticle) {
		if (err) {
			console.log(err);
		} else {
			res.redirect(302, '/articles');
		}
	});
});



router.delete('/:id', function (req, res){
	var articleID = req.params.id;

	article.findByIdAndRemove(articleID, function (err){
		if (err){
			console.log(err);
		} else {
			res.redirect(302, '/articles');
		} 
	});
});


module.exports = router;



