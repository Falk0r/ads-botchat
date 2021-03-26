const mongoose = require("mongoose");

const userGoogle = mongoose.Schema({
    googleId: String,
    name: String,
    given_name: String,
    family_name: String,
    picture: String,
    email: String,
    locale: String,
});

module.exports = mongoose.model("usersGoogle", userGoogle);
