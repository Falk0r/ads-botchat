var express = require('express');
const mongoose = require('mongoose');
const Ads = require('../models/shema');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/ads', {useNewUrlParser: true});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res) => {
  const user = req.body.user;
  const text = req.body.text;
  const image = req.body.image;
  const url = req.body.url;

  if (!user || !text || !image || !url) {
    res.send('Il manque un argument');
    return
  }

  const nouveau_ads = new Ads({
      user,
      text,
      image,
      url
  })

  await nouveau_ads.save();
  res.json(nouveau_ads);

})

module.exports = router;
