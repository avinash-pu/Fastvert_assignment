const mongoose = require('mongoose');


const h1Schema = new mongoose.Schema({
  header: { type: String },
});



module.exports = mongoose.model('H1', h1Schema);
