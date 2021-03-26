const mongoose = require("mongoose");
const Links = require("../models/links");
const keys = require("../config/keys");

mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const getLinkUrl = async (id) => {
    try {
        const getLink = await Links.find({ _id: id });
        return getLink.url;        
    } catch (error) {
        return ({ message: "error to retrieve link" });
    }
}

const createLink = async (owner, datas) => {
    const user = owner.userId;
    const url = datas.url;

    if (!user || !url) {
        return false;
    }

    const newLink = new Links({
        user,
        url,
    });
    try {
        await newLink.save();
        return newLink;
    } catch (error) {
        return false;
    }
}

module.exports.getLinkUrl = getLinkUrl;
module.exports.createLink = createLink;