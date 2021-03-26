const mongoose = require('mongoose');

const shema = mongoose.Schema({
  user : String,
  url : String,
});

module.exports = mongoose.model('links', shema);