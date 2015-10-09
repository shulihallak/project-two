var express 	= require('express'),
	PORT 		= process.env.PORT || 3369,
	server 		= express(),
	MONGOURI 	= process.env.MONGOLAB_URI,
	dbname      = 'needsToBeChanged',
	mongoose	= require('mongoose');





server.get('/secret-test', function (req, res) {
	res.write("Welcome to my amazing app");
	res.end();
});


mongoose.connect(MONGOURI + '/' + dbname);
server.listen(PORT, function (){
	console.log("SERVER IS UP ON PORT: ", PORT);
});

