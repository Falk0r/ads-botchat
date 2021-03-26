const mongoose = require('mongoose');

const shema = mongoose.Schema({
  user : String,
  text : String,
  image : String,
  url : String,
  script : String
});

module.exports = mongoose.model('ads', shema);