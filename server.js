var express 	= require('express'),
	PORT 		= process.env.PORT || 3369,
	server 		= express();



server.get('/secret-test', function (req, res) {
	res.write("Welcome to my amazing app");
	res.end();
});

server.listen(PORT, function (){
	console.log("SERVER IS UP ON PORT: ", PORT);
});

