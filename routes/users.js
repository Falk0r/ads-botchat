var express = require('express');
var router = express.Router();

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
      next();
  } else {
      res.send('You must login!');
  }
}

/* GET users listing. */
router.get('/', isUserAuthenticated,function(req, res, next) {
  res.render('users', {name: req.user._json.name, googleId: req.user._json.sub});
});

module.exports = router;
