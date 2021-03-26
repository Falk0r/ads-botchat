const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

User.methods.isValidPassword = async function(password){
    const user = this;
    if (password === user.password) {
        return true
    }
    return false;
}

const UserModel = mongoose.model("users", User);
module.exports = UserModel;