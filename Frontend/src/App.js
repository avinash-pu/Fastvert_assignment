import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import EmployeeList from '../src/pages/EmployeeListPage';
import AddEmployee from '../src/pages/AddEmployeePage';
import EditEmployee from '../src/pages/editemp';
import UpdateEmployee from '../src/pages/UpdateEmployeePage';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/edit-employee" element={<EditEmployee />} />
            <Route path="/update-employee" element={<UpdateEmployee />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
