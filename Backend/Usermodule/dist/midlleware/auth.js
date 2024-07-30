"use strict";

var jwt = require('jsonwebtoken');
var auth = function auth(req, res, next) {
  var token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      msg: 'no token, authorization denied'
    });
  }
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid'
    });
  }
};
module.exports = auth;