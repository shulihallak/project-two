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
	flash 			= require('connect-flash');
	
	
	
	
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

server.use(function(req, res, next) {
  // res.locals.requested = req.originalUrl;
  // res.locals.marked = marked;
  res.locals.userId = req.session.userId || "guest";
  res.locals.userName = req.session.userName || "Guest";
  next();
});

server.get('/', function (req, res){
	res.render('index');
});

server.get('/signin', function (req, res){
	res.render('users/new');
});

server.get('/login', function (req, res){
	res.render('users/login');
});

// server.get('/login', function (req, res){
// 	res.render('views/users/login');
// });

// server.all('/users', requireAuthentication);


mongoose.connect(MONGOURI + '/' + dbname);
server.listen(PORT, function (){
	console.log("SERVER IS UP ON PORT: ", PORT);
});

var articleController = require('./controllers/articles_controller.js');
server.use('/articles', articleController);

var userController = require('./controllers/users_controller.js');
server.use('/users', userController);


