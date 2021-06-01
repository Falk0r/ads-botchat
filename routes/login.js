var express = require('express');
var router = express.Router();
//Google Auth
const passport = require("passport");
//User Auth
const jwt = require('jsonwebtoken');
//mongoDB
const mongoose = require('mongoose');
const UsersGoogle = require('../models/usersGoogle');
const keys = require('../config/keys');

mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,});


// passport.authenticate middleware is used here to authenticate the request
router.get("/auth/google", passport.authenticate("google", {
scope: ["profile", "email"]
}));

// The middleware receives the data from Google and runs the function on Strategy config
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    console.log(req.user._json);
    UsersGoogle.findOne({googleId : req.user._json.sub}).then((currentUser) => {
        //if we haven't record, create a new user
        if (!currentUser) {
            new UsersGoogle({
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

router.post("/",
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occured.');
                        return next(error);
                    }
                    req.login(
                        user,
                        {session: false},
                        async (error) => {
                            if (error) return next(error);

                            const body = { userName: user.name, userEmail: user.email, userId : user._id}
                            const token = jwt.sign({user: body}, keys.secret);

                            return res.json({ Token: token, authenticated: true });
                        }
                    )
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
)



module.exports = router;
  
  