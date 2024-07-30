const express = require('express');
const mongoose = require('mongoose');
const Employee = require('../modal/employee');  // Adjust path if necessary
const History = require('../modal/history');    // Adjust path if necessary
const H1 = require('../modal/h1');    // Adjust path if necessary

// Create a new H1
const createH1 = async (req, res) => {
    try {
        const newH1 = new H1(req.body);
        await newH1.save();


        res.status(201).json(newH1);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all H1
const getH1= async (req, res) => {
    try {
        const h1list = await H1.find();
        res.status(200).json({data:h1list});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update an H1
const updateH1 = async (req, res) => {
    try {

    const id = req.body.id;
    const updateData = req.body;

    // Update the document with the given ObjectID
    const result = await H1.updateOne(
      { _id:id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'H1 not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new employee
const createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();

        // Log history
        await History.create({
            employeeId: newEmployee._id,
            changeType: 'CREATE',
            changedData: newEmployee
        });

        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({data:employees});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an employee
const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Log history
        await History.create({
            employeeId: employee._id,
            changeType: 'UPDATE',
            changedData: req.body
        });

        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Log history
        await History.create({
            employeeId: employee._id,
            changeType: 'DELETE',
            changedData: employee
        });

        res.status(200).json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get history of a specific employee
const getEmployeeHistory = async (req, res) => {
    try {
        const histories = await History.find({ employeeId: req.params.id }).sort({ changeDate: -1 });
        if (!histories.length) {
            return res.status(404).json({ message: 'No history found' });
        }
        res.status(200).json({data:histories});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    createH1,
    getH1,
    updateH1,
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getEmployeeHistory
};
