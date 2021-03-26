var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cookieSession = require("cookie-session");
const cors = require('cors');
//Google Auth
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adsRouter = require("./routes/ads");
var apiRouter = require("./routes/api");
var loginRouter = require("./routes/login");

var app = express();

// cookieSession config
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
        keys: ["uzehuizehof"],
    })
);

app.use(cors());

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "http://localhost:3000/login/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile); // passes the profile data to serializeUser
        }
    )
);
//Strategy for User
require('./auth/auth');

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ads", passport.authenticate('jwt', {session: false}) ,adsRouter);
app.use("/login", loginRouter);
app.use("/api", passport.authenticate('jwt', {session: false}) ,apiRouter);

// Logout route
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
