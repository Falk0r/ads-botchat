const passport = require('passport');
const keys = require('../config/keys');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/users');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });
                
                if (!user) {
                    return done(null, false, {message : 'User not found'}); //Message to change for security
                }
                const validate = await user.isValidPassword(password);
                
                if (!validate) {
                    return done(null, false, {message: 'Wrong password'}); //Message to change for security
                }
                
                console.log(user);
                return done(null, user, {message: 'Logged in Successfully'});
            } catch (error) {
                return done(error);
            }
        }
    )
)

passport.use(
    new JWTstrategy(
      {
        secretOrKey: keys.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        console.log('ok google');
        console.log(token);
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );