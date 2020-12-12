var express = require('express');
var router = express.Router();
//Google Auth
const passport = require("passport");
//mongoDB
const mongoose = require('mongoose');
const Users = require('../models/users');
const keys = require('../config/keys');
mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true});


// passport.authenticate middleware is used here to authenticate the request
router.get("/auth/google", passport.authenticate("google", {
scope: ["profile", "email"]
}));

// The middleware receives the data from Google and runs the function on Strategy config
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    console.log(req.user._json);
    Users.findOne({googleId : req.user._json.sub}).then((currentUser) => {
        //if we haven't record, create a new user
        if (!currentUser) {
            new Users({
                googleId : req.user._json.sub,
                name : req.user._json.name,
                given_name : req.user._json.given_name,
                family_name : req.user._json.family_name,
                picture : req.user._json.picture,
                email : req.user._json.email,
                locale : req.user._json.locale,
            }).save();
        }
    })

    res.redirect('/users');
});


module.exports = router;
  
  