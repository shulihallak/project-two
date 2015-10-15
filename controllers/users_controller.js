var express = require('express'),
	router  = express.Router(),
	User = require('../models/user_model.js');



/* User routes */
function requireLogin(req, res, next){
	if(!req.user) {
		res.redirect('/');
	} else {
		next();
	}
};

// server.use(function (req, res, next){
// 	if(req.session && req.session.user){
// 		User.findOne({ username: req.session.user.username}, function (err, user){
// 			if(user) {
// 				req.user = user;
// 				req.session.user = user;
// 				res.locals.user = user;
// 			}
// 		});
// 	} else {
// 		next();
// 	}
// });

//Index - all users
router.get('/', function (req, res, next){
	User.find({}, function (err, usersArray){
		if (err) {
			console.log(err);
		} else {
			res.render('users/index', {
				users: usersArray,
				currentUser: req.session.user
			});
		};
	});
});

//New user - show form
router.get('/new', function (req, res, next){
	res.render('users/new', {
		currentUser: req.session.user
	});
	
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
			req.session.currentUser = user.username;
			res.redirect(302, '/users/show/' + user._id);
		}
	});
});


router.get('/login_error', function (req, res){
	res.render('users/login_error');
});

router.get('/login', function (req, res){
	res.render('users/login', {
		currentUser: req.session.user
	});	
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


router.post('/login', function (req, res){
	console.log("TRYING TO LOGIN", req.body)
	var login = req.body.user;
	User.findOne({ username: login.username }, function (err, user){
		if (user && user.password === login.password){
			req.session.currentUser = user.username;
			res.redirect(302, '/users/show/' + user._id);
		} else {
			res.redirect(302, '/users/login');
		}
	});
});


// show the user 
router.get('/show/:id', function (req, res){
	var userId = req.params.id;

	User.findById(userId, function (err, foundUser){
		if (err){
			return err;
		} else {
			res.render('users/show', {
				user: foundUser,
				currentUser: req.session.user
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
				user: foundUser,
				currentUser: req.session.user
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

router.get('/logout', function (req, res){
	req.session.user = '';
	res.redirect('/');
});

module.exports = router;



