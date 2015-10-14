
passport.use(new Strategy(
  function(username, password, cb) {
    user.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  user.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


routes

//using passport module for login
// code re-use via passport documentation
// router.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

// router.get('/logout', function (req, res){
//  req.logout();
//  res.redirect('/');
// });

//using passport to show profile page

// router.get('/show',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.render('users/show', { user: req.user });
//   });