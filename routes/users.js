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
  res.send('respond with a resource <li><a href="/logout">Logout</a></li>');
});

module.exports = router;
