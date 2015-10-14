var express 		= require('express'),
	PORT 			= process.env.PORT || 3369,
	server 			= express(),
	methodOverride  = require('method-override'),
	MONGOURI 		= process.env.MONGOLAB_URI || 'mongodb://localhost:27017',
	dbname      	= 'wiki-app',
	mongoose		= require('mongoose');
	bodyParser  	= require('body-parser'),
	ejs 			= require('ejs'),
	morgan 			= require('morgan'),
	expressLayouts  = require('express-ejs-layouts'),
	session 		= require('express-session'),
	cookieParser    = require('cookie-parser'),
	flash 			= require('connect-flash'),
	passport        = require('passport'),
	Strategy 		= require('passport-local').Strategy,
	timestamps		= require('mongoose-timestamp');
	


// passport.use(new Strategy(
// 	function (username, passord, cb){
// 		user.findByUsername(username, function (err, user){
// 			if (err) { return cb(err); }
// 			if (!user) { return cb(null, false); }
// 			if (user.password != password) { return cb(null, false); }
// 			return cb(null, user);
// 		});
// 	}));

// passport.deserializeUser(function(id, cb) {
//   user.findById(id, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });


server.use(bodyParser.urlencoded({
	extended: true
}));

server.use(methodOverride('_method'));
server.set('views', './views');
server.set('view engine', 'ejs');
server.use(express.static('./public'));

server.use(cookieParser('secret'));
server.use(session({
	secret: 'Best wiki ever',
	resave: true,
	saveUninitialized: true
}));
server.use(flash());
// server.use(passport.initialize());
// server.use(passport.session());

server.use(morgan('dev'));
server.use(expressLayouts);




server.use(function (req, res, next){
	console.log(req.session);
	console.log(req.body);
	console.log(req.params);
	next();
});


server.get('/login', function (req, res){
	res.render('users/login');
});

server.get('/login', function (req, res){
	res.render('views/users/login');
});

// server.all('/users', requireAuthentication);


mongoose.connect(MONGOURI + '/' + dbname);
server.listen(PORT, function (){
	console.log("SERVER IS UP ON PORT: ", PORT);
});

var articleController = require('./controllers/articles_controller.js');
server.use('/articles', articleController);

var userController = require('./controllers/users_controller.js');
server.use('/users', userController);


