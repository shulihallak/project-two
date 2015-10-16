var express = require('express'), 
	router = express.Router(),
  	multer = require('multer');

var uploading = multer({
  dest: __dirname + '../public/uploads/',
  limits: {fileSize: 1000000, files:1},
})

router.get('/', function (req, res){
	res.render('uploads/index');
});

router.post('/upload', uploading, function(req, res) {

})

module.exports = router