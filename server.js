var express 		= require('express'),
	PORT 			= process.env.PORT || 3369,
	server 			= express(),
	MONGOURI 		= process.env.MONGOLAB_URI || 'mongodb://localhost:27017',
	dbname      	= 'needsToBeChanged',
	mongoose		= require('mongoose');
	bodyParser  	= require('body-parser'),
	ejs 			= require('ejs'),
	morgan 			= require('morgan'),
	expressLayouts  = require('express-layouts'),
	session 		= require('express-session'),
	methodOverride 	= require('method-override');


server.use(bodyParser.urlencoded({
	extended: true
}));

server.use(express.static('./public'));

server.set('views', './views');
server.set('view engine', 'ejs');


server.use(session({
	secret: 'I love my model kitchen',
	resave: true,
	saveUninitialized: true
}));

server.use(morgan('dev'));
server.use(expressLayouts);
server.use(methodOverride('_method'));

server.get('/', function (req, res, next){
	res.render('welcome');
	next();

})

server.get('/secret-test', function (req, res) {
	res.write("Welcome to my amazing app");
	res.end();
});


mongoose.connect(MONGOURI + '/' + dbname);
server.listen(PORT, function (){
	console.log("SERVER IS UP ON PORT: ", PORT);
});










//Article controller

var articleController = require('./controllers/article_controller.js');
server.use('/counter', counterController);
