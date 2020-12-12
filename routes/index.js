var express = require('express');
const mongoose = require('mongoose');
const Ads = require('../models/shema');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});


module.exports = router;
