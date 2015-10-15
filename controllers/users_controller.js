var express = require('express'),
	router  = express.Router(),
	User = require('../models/user_model.js');



/* User routes */



//Index - all users
router.get('/', function (req, res, next){
	User.find({}, function (err, usersArray){
		if (err) {
			console.log(err);
		} else {
			res.render('users/index', {
				users: usersArray
			});
		};
	});
});

//New user - show form
router.get('/new', function (req, res, next){
	res.render('users/new');
});

//Create user
router.post('/', function (req, res, next){
	// console.log(req.body)
	var newUser = new User(req.body.user);
	// console.log(newUser);

	newUser.save(function (err, user){
		if (err) {
			console.log(err);
		} else {
			console.log(user);
			req.session.currentUser = user;
			res.redirect(302, '/users/show/' + user._id);
		}
	});
});

router.get('/login', function (req, res){
	if(!user){
		res.render('users/login');
	} else {
		res.render('users/show/' + user._id);
	}
	
});

// router.get('/welcome', function (req, res){
// 	if (req.session.currentUser){
// 		res.render('users/welcome', {
// 			currentUser: req.session.currentUser
// 		});
// 	} else {
// 		res.redirect(302, '/users/login');
// 	}
// });

router.get('/login_error', function (req, res){
	res.render('users/login_error');
});

router.post('/login', function (req, res){
	console.log("TRYING TO LOGIN", req.body)
	var login = req.body.user;
	User.findOne({ username: login.username }, function (err, user){
		if (user && user.password === login.password){
			req.session.currentUser = user;
			res.redirect(302, '/users/show/' + user._id);
		} else {
			res.redirect(302, '/users/login_error');
		}
	})
});



// show the user 
router.get('/show/:id', function (req, res){
	var userID = req.params.id;

	User.findById(userID, function (err, foundUser){
		if (err){
			return err;
		} else {
			res.render('users/show', {
				user: foundUser
			});
		}
	});
});

//Edit the user form
router.get('/:id/edit', function (req, res){
	var userID = req.params.id;

	User.findById(userID, function (err, foundUser){
		if (err) {
			console.log('something broke', err);
		} else {
			res.render('users/edit', {
				user: foundUser
			});
		}
	});
});

//Update user object
router.patch('/:id', function (req, res){
	var userID = req.params.id;
	var userParams = req.body.user;

	User.findByIdAndUpdate(userID, userParams, function (err, updatedUser) {
		if (err) {
			console.log(err);
		} else {
			res.redirect(302, '/users');
		}
	});
});


//delete user
router.delete('/:id', function (req, res){
	var userID = req.params.id;

	User.findByIdAndRemove(userID, function (err){
		if (err){
			console.log(err);
		} else {
			res.redirect(302, '/users');
		} 
	});
});


module.exports = router;



