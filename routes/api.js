var express = require("express");
const mongoose = require("mongoose");
const Ads = require("../models/ads");
const keys = require("../config/keys");
var router = express.Router();

mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

router.get("/ads", async (req, res, next) => {
    console.log(req.user);
    const ads = await Ads.find({ user: req.user.userName });
    return res.json(ads);
});

router.post("/ads", async (req, res, next) => {
    console.log(req.body);
    const user = req.user.userName;
    const text = req.body.text;
    const image = req.body.image;
    const url = req.body.url;

    if (!user || !text || !image || !url) {        
        return res.json({message: "error to create an ad"});
    }

    const new_ads = new Ads({
        user,
        text,
        image,
        url,
    });

    await new_ads.save();
    return res.json(new_ads);
});

module.exports = router;