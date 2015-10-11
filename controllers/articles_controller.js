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

	article.findById(articleID, function (err, foundArticle){
		if (err) {
			console.log('something broke', err);
		} else {
			res.render('articles/edit', {
				article: foundArticle
			});
		}
	});
});

router.patch('/:id', function (req, res){
	var articleID = req.params.id;
	var articleParams = req.body.article;

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

		Article.remove({
			_id: articleID
		}, function (err) {
			if (err) {
				console.log(err);
			} else {
				res.redirect(302, '/articles');
			}	
	});
});


module.exports = router;




