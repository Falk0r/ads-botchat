var express = require('express');
var router = express.Router();
//Google Auth
const passport = require("passport");


// passport.authenticate middleware is used here to authenticate the request
router.get("/auth/google", passport.authenticate("google", {
scope: ["profile", "email"]
}));

// The middleware receives the data from Google and runs the function on Strategy config
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    console.log(req.user._json);
    res.redirect('/users');
});


module.exports = router;
  
  