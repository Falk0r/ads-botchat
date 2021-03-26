const mongoose = require('mongoose');

const shema = mongoose.Schema({
  user : String,
  title : String,
  text : String,
  image : String,
  url : String,
  link : String,
  status : String,
});

module.exports = mongoose.model('ads', shema);