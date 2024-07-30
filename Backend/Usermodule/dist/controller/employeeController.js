'use strict';

var _this = this;

var express = require('express');
var mongoose = require('mongoose');
var Employee = require('../modal/employee'); // Adjust path if necessary
var History = require('../modal/history'); // Adjust path if necessary
var H1 = require('../modal/h1'); // Adjust path if necessary

// Create a new H1
var createH1 = function createH1(req, res) {
    var newH1;
    return regeneratorRuntime.async(function createH1$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                newH1 = new H1(req.body);
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(newH1.save());

            case 4:

                res.status(201).json(newH1);
                context$1$0.next = 10;
                break;

            case 7:
                context$1$0.prev = 7;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(400).json({ message: context$1$0.t0.message });

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 7]]);
};

// Get all H1
var getH1 = function getH1(req, res) {
    var h1list;
    return regeneratorRuntime.async(function getH1$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(H1.find());

            case 3:
                h1list = context$1$0.sent;

                res.status(200).json({ data: h1list });
                context$1$0.next = 10;
                break;

            case 7:
                context$1$0.prev = 7;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: context$1$0.t0.message });

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 7]]);
};

// Update an H1
var updateH1 = function updateH1(req, res) {
    var id, updateData, result;
    return regeneratorRuntime.async(function updateH1$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                id = req.body.id;
                updateData = req.body;
                context$1$0.next = 5;
                return regeneratorRuntime.awrap(H1.updateOne({ _id: id }, { $set: updateData }));

            case 5:
                result = context$1$0.sent;

                if (!(result.matchedCount === 0)) {
                    context$1$0.next = 8;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'H1 not found' }));

            case 8:

                res.status(200).json({ message: 'H1 updated successfully' });
                context$1$0.next = 14;
                break;

            case 11:
                context$1$0.prev = 11;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(400).json({ message: context$1$0.t0.message });

            case 14:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 11]]);
};

// Create a new employee
var createEmployee = function createEmployee(req, res) {
    var newEmployee;
    return regeneratorRuntime.async(function createEmployee$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                newEmployee = new Employee(req.body);
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(newEmployee.save());

            case 4:
                context$1$0.next = 6;
                return regeneratorRuntime.awrap(History.create({
                    employeeId: newEmployee._id,
                    changeType: 'CREATE',
                    changedData: newEmployee
                }));

            case 6:

                res.status(201).json(newEmployee);
                context$1$0.next = 12;
                break;

            case 9:
                context$1$0.prev = 9;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(400).json({ message: context$1$0.t0.message });

            case 12:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 9]]);
};

// Get all employees
var getAllEmployees = function getAllEmployees(req, res) {
    var employees;
    return regeneratorRuntime.async(function getAllEmployees$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(Employee.find());

            case 3:
                employees = context$1$0.sent;

                res.status(200).json({ data: employees });
                context$1$0.next = 10;
                break;

            case 7:
                context$1$0.prev = 7;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: context$1$0.t0.message });

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 7]]);
};

// Get a single employee by ID
var getEmployeeById = function getEmployeeById(req, res) {
    var employee;
    return regeneratorRuntime.async(function getEmployeeById$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(Employee.findById(req.params.id));

            case 3:
                employee = context$1$0.sent;

                if (employee) {
                    context$1$0.next = 6;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Employee not found' }));

            case 6:
                res.status(200).json(employee);
                context$1$0.next = 12;
                break;

            case 9:
                context$1$0.prev = 9;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: context$1$0.t0.message });

            case 12:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 9]]);
};

// Update an employee
var updateEmployee = function updateEmployee(req, res) {
    var employee;
    return regeneratorRuntime.async(function updateEmployee$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(Employee.findByIdAndUpdate(req.params.id, req.body, { 'new': true, runValidators: true }));

            case 3:
                employee = context$1$0.sent;

                if (employee) {
                    context$1$0.next = 6;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Employee not found' }));

            case 6:
                context$1$0.next = 8;
                return regeneratorRuntime.awrap(History.create({
                    employeeId: employee._id,
                    changeType: 'UPDATE',
                    changedData: req.body
                }));

            case 8:

                res.status(200).json(employee);
                context$1$0.next = 14;
                break;

            case 11:
                context$1$0.prev = 11;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(400).json({ message: context$1$0.t0.message });

            case 14:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 11]]);
};

// Delete an employee
var deleteEmployee = function deleteEmployee(req, res) {
    var employee;
    return regeneratorRuntime.async(function deleteEmployee$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(Employee.findByIdAndDelete(req.params.id));

            case 3:
                employee = context$1$0.sent;

                if (employee) {
                    context$1$0.next = 6;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'Employee not found' }));

            case 6:
                context$1$0.next = 8;
                return regeneratorRuntime.awrap(History.create({
                    employeeId: employee._id,
                    changeType: 'DELETE',
                    changedData: employee
                }));

            case 8:

                res.status(200).json({ message: 'Employee deleted' });
                context$1$0.next = 14;
                break;

            case 11:
                context$1$0.prev = 11;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: context$1$0.t0.message });

            case 14:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 11]]);
};

// Get history of a specific employee
var getEmployeeHistory = function getEmployeeHistory(req, res) {
    var histories;
    return regeneratorRuntime.async(function getEmployeeHistory$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(History.find({ employeeId: req.params.id }).sort({ changeDate: -1 }));

            case 3:
                histories = context$1$0.sent;

                if (histories.length) {
                    context$1$0.next = 6;
                    break;
                }

                return context$1$0.abrupt('return', res.status(404).json({ message: 'No history found' }));

            case 6:
                res.status(200).json({ data: histories });
                context$1$0.next = 12;
                break;

            case 9:
                context$1$0.prev = 9;
                context$1$0.t0 = context$1$0['catch'](0);

                res.status(500).json({ message: context$1$0.t0.message });

            case 12:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 9]]);
};

module.exports = {
    createH1: createH1,
    getH1: getH1,
    updateH1: updateH1,
    createEmployee: createEmployee,
    getAllEmployees: getAllEmployees,
    getEmployeeById: getEmployeeById,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee,
    getEmployeeHistory: getEmployeeHistory
};

// Update the document with the given ObjectID

// Log history

// Log history

// Log history