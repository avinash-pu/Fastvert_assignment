'use strict';

var mongoose = require('mongoose');

var h1Schema = new mongoose.Schema({
  header: { type: String }
});

module.exports = mongoose.model('H1', h1Schema);