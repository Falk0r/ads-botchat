var express = require('express');
const mongoose = require('mongoose');
const Ads = require('../models/shema');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/ads', {useNewUrlParser: true});

/* GET home page. */
router.get('/', async (req, res, next) => {
  return res.send('HomePage');
});

module.exports = router;
