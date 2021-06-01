var express = require("express");
const mongoose = require("mongoose");
const Ads = require("../models/ads");
const keys = require("../config/keys");
var router = express.Router();

mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

/* GET home page. */
router.get("/", async (req, res, next) => {
    const ads = await Ads.find();
    return res.json({
        message: "Log ok",
        user: req.user,
        token: req.query.secret_token,
        ads,
    });
});

router.get("/:user", async (req, res, next) => {
    const user = req.params.user;
    const ad = await Ads.find({ user: user });
    res.json(ad);
});

router.post("/", async (req, res) => {
    const user = req.body.user;
    const text = req.body.text;
    const image = req.body.image;
    const url = req.body.url;
    const status = "pending";

    if (!user || !text || !image || !url) {
        res.send("Il manque un argument");
        return;
    }

    const nouveau_ads = new Ads({
        user,
        text,
        image,
        url,
        status,
    });

    await nouveau_ads.save();
    res.json(nouveau_ads);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const suppr = await Ads.deleteOne({ _id: id });
    res.json(suppr);
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const ad = await Ads.findById(id);

    const text = req.body.text;
    const image = req.body.image;
    const url = req.body.url;

    if (text) {
        ad.text = text;
    }
    if (image) {
        ad.image = image;
    }
    if (url) {
        ad.url = url;
    }

    await ad.save();
    res.json(ad);
});

module.exports = router;
