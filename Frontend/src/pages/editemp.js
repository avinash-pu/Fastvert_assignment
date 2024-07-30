import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import './UpdateEmployeePage.css';

// Validation schema for Formik
const validationSchema = Yup.object({
  employeeName: Yup.string().required('Name is required'),
  location: Yup.string(),
  joiningDate: Yup.date(),
  contact: Yup.string(),
  designation: Yup.string(),
  employeeStatus: Yup.string().oneOf(['Remote Location', 'Contract Employee', 'Full-Time']).required('Status is required')
});

const EditEmp = () => {
  
  const navigate = useNavigate();

  const location =useLocation()
  const { selectedEmployee } = location.state || {};
console.log('sesd',selectedEmployee)
  // Formik form setup
  const formik = useFormik({
    initialValues: {
      employeeName: selectedEmployee?.employeeName,
      location: selectedEmployee?.location,
      joiningDate: selectedEmployee?.joiningDate,
      contact: selectedEmployee?.contact,
      designation: selectedEmployee?.designation,
      employeeStatus: selectedEmployee?.employeeStatus
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (selectedEmployee) {
          await axios.put(`http://localhost:5001/api/employees/${selectedEmployee?._id}`, values);
          setTimeout(() => {
            navigate('/'); // Navigate to the employee list page
          }, 2000); // Show success message for 2 seconds
        }
      } catch (error) {
        console.error("Error updating the employee:", error);
      }
    }
  });

  return (
    <div className="update-employee-container">
      <h2>Update Employee</h2>
     
     <div>
     <form onSubmit={formik.handleSubmit} className="employee-form">
            <div className="form-group">
              <label htmlFor="employeeName">Name</label>
              <input
                id="employeeName"
                name="employeeName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employeeName}
              />
              {formik.touched.employeeName && formik.errors.employeeName ? (
                <div className="error">{formik.errors.employeeName}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
              />
            </div>

            <div className="form-group">
              <label htmlFor="joiningDate">Joining Date</label>
              <input
                id="joiningDate"
                name="joiningDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.joiningDate}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                id="contact"
                name="contact"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact}
              />
              {formik.touched.contact && formik.errors.contact ? (
                <div className="error">{formik.errors.contact}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="designation">Designation</label>
              <input
                id="designation"
                name="designation"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.designation}
              />
            </div>

            <div className="form-group">
              <label htmlFor="employeeStatus">Status</label>
              <select
                id="employeeStatus"
                name="employeeStatus"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employeeStatus}
              >
                <option value="Remote Location">Remote Location</option>
                <option value="Contract Employee">Contract Employee</option>
                <option value="Full-Time">Full-Time</option>
              </select>
              {formik.touched.employeeStatus && formik.errors.employeeStatus ? (
                <div className="error">{formik.errors.employeeStatus}</div>
              ) : null}
            </div>

{      selectedEmployee?.employeeId&&      <Button type="submit">Update Employee</Button>
}          
</form>
     </div>
    </div>
  );
};

export default EditEmp;
