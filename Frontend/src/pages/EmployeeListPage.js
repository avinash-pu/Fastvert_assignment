import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import moment from 'moment';
import { APIURL } from '../util';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(APIURL+'/api/employees');
      setEmployees(res?.data?.data);
    }
    getData();
  }, []);

  const handleClick = async (emp) => {
    try {
      await axios.delete(APIURL+`/api/employees/${emp?._id}`);
      const res = await axios.get(APIURL+'/api/employees');
      setEmployees(res?.data?.data);
    } catch (e) {
      console.log('Error', e);
    }
  };

  return (
    <div>
      <div className="employee-list-page">
        <h1>Employee List</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Joining Date</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Tools</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{employee.employeeName}</td>
                <td>{employee.location}</td>
                <td>{moment(employee.joiningDate).format('DD-MM-YYYY')}</td> {/* Format the joining date */}
                <td>{employee.designation}</td>
                <td>{employee.employeeStatus}</td>
                <td>
                  <Link to={`/edit-employee`} state={{ selectedEmployee: employee }}>
                    <Button variant="warning" className="me-2">Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleClick(employee)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeListPage;
