"use strict";

var express = require('express');
var cors = require('cors');
var connectDB = require('./databse/db');
//const userRoutes = require('./routes/userrout');
var employeeRoutes = require('./routes/employeeRoutes'); //change
require('dotenv').config();
var app = express();
app.use(cors());
app.use(express.json());
connectDB();

//app.use('/api',userRoutes);
app.use('/api', employeeRoutes); //changes

var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  return console.log("server running on port ".concat(PORT));
});