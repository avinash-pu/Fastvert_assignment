"use strict";

var express = require('express');
var router = express.Router();
var employeeController = require('../controller/employeeController');
router.post('/h1', employeeController.createH1);
router.get('/h1', employeeController.getH1);
router.put('/h1', employeeController.updateH1);
router.post('/employees', employeeController.createEmployee);
router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.put('/employees/:id', employeeController.updateEmployee);
router["delete"]('/employees/:id', employeeController.deleteEmployee);
router.get('/employees/:id/history', employeeController.getEmployeeHistory); //update 

module.exports = router;