import React from 'react';
import { Link } from 'react-router-dom'; 
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Fastvert</h2>
      <ul>
      <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/employee-list">Employee list</Link>
        </li>
        <li>
          <Link to="/add-employee">Add Employees</Link>
        </li>
        <li>
          <Link to="/edit-employee">Edit Employees</Link>
        </li>
        <li>
          <Link to="/update-employee">Update Employees</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

