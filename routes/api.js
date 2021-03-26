var express = require("express");
var router = express.Router();
const ads = require("../controllers/ads");
const links = require("../controllers/links");

router.get("/ads", async (req, res, next) => {
    const getAllAds = await ads.getAllAds(req.user);
    return res.json(getAllAds);
});

router.post("/ads", async (req, res, next) => {
    const createLink = await links.createLink(req.user, req.body)
    if (createLink) {
        req.body.link = createLink._id;
        const createAds = await ads.createAds(req.user, req.body);
        return res.json(createAds);
    }
    return res.json({message: "error to create an ad"})
});

router.delete("/ads", async (req, res) => {
    console.log(req.body.item);
    const deleteAds = await ads.deleteAds(req.body.item);
    return res.json(deleteAds);
});

router.put("/ads", async (req, res) => {
    console.log(req.body);
    const updateAds = await ads.updateAds(req.body)
    return res.json(updateAds);
})

module.exports = router;
