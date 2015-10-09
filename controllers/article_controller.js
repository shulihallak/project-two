var express = require('express'),
	router  = express.Router(),
	article = require('../models/article_model.js');


/* Article routes */

//index
router.get('/', function (req, res, next){
	article.findByID(id, function (err, foundArticle){
		if (err) {
			console.log(err);
		} else {
			res.render('index');
		}
	});
});

//New
router.get('/new', function (req, res, next){
	res.render('articles/new');
});

//Create
router.post('/', function (req, res, next){
	var articleObject = req.body.article;
	var newArticel = new Article(articleObject);
	console.log(req.body);

	newArticle.save(function (err, newPost){
		if (err) {
			console.log('article post rejected');
			console.log(err);
		} else {
			console.log('new article saved!');
			res.redirect(302, '/articles')
		}
	})
	// var menuEntry = req.body.Menu;
	// var newMenu = new Menu(menuEntry);
	// console.log(req.body);

	// newMenu.save(function (err, newMenuItem){
	// 	if (err) {
	// 		console.log("Menu Item Rejected");
	// 		console.log(err);
	// 	} else {
	// 		console.log("Menu Item Saved");
	// 	} res.redirect(302, '/kitchen/menu');
	// });
});

//show
router.get('/:id', function (req, res, next){

});

//Delete will go here if I want it

//edit
router.get('/:id/edit', function (req, res, next){

});

//update
router.patch('/:id', function (req, res, next) {

});

router.get('/article', function (req, res){
	
});




module.exports = router;

// reference code

// router.get('/menu/new', function (req, res) {
// 	res.render('kitchen/new');
// });

// router.post('/menu', function (req, res){
// 	var menuEntry = req.body.Menu;
// 	var newMenu = new Menu(menuEntry);
// 	console.log(req.body);

// 	newMenu.save(function (err, newMenuItem){
// 		if (err) {
// 			console.log("Menu Item Rejected");
// 			console.log(err);
// 		} else {
// 			console.log("Menu Item Saved");
// 		} res.redirect(302, '/kitchen/menu');
// 	});
// });

// router.get('/menu/:id/edit', function (req, res){
//  // show ITEM edit form page
//  	var menuItem = req.params.id;
//  	var itemEdit = req.body.Menu;
//  	Menu.find({
//  		item: menuItem
//  	}, function (err, itemToEdit){
//  		if (err) {
//  			console.log('error');
//  			console.log(err);
//  		} else {
//  			res.render('/kitchen/edit', {
//  				item: menuItem,
//  				itemEdit: itemToEdit
//  			});
//  		}
//  	});
//  });




// router.patch('/menu/:id', function (req, res){

// 		Menu.findByIdAndUpdate(req.param.id, req.body.Menu, function (err, updatedItem){
// 			if (err) {
// 				console.log("item error");
// 			} else {
// 				res.redirect(302, '/kitchen/menu');
// 			}
// 		});
// });

// router.delete('/menu/:id/edit', function (req, res){
// 	Menu.findByIdAndRemove(req.params.id, function (err, item) {
// 		if (err) {
// 			console.log('delete error');
// 		} else {
// 			res.redirect(302, 'kitchen/menu');
// 		};
// 	})

// });






