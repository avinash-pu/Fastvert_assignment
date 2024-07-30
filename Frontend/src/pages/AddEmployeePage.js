import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddEmployeePage.css'; 
import { APIURL } from '../util';

const validationSchema = Yup.object({
  employeeName: Yup.string(),
  location: Yup.string(),
  joiningDate: Yup.date(),
  contact: Yup.string(),
  designation: Yup.string(),
  employeeStatus: Yup.string().oneOf(['Remote Location', 'Contract Employee', 'Full-Time']).required('Status is required')
});

const AddEmployeePage = () => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      employeeName: '',
      location: '',
      joiningDate: '',
      contact: '',
      designation: '',
      employeeStatus: 'Full-Time'
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(APIURL+'/api/employees', values);
        navigate('/');
      } catch (error) {
        console.error("There was an error adding the employee!", error);
      }
    }
  });

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
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
          {formik.touched.employeeName && formik.errors.employeeName ? <div className="error">{formik.errors.employeeName}</div> : null}
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
          {formik.touched.contact && formik.errors.contact ? <div className="error">{formik.errors.contact}</div> : null}
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
          {formik.touched.employeeStatus && formik.errors.employeeStatus ? <div className="error">{formik.errors.employeeStatus}</div> : null}
        </div>

        <button type="submit" className="submit-button">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
