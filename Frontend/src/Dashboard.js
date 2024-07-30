import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <button className="update-button" onClick={() => {
        const newText = prompt('Enter new H1 text:');
        if (newText !== null && newText.trim() !== '') {
          document.querySelector('h1').innerText = newText;
        }
      }}>Enter new H1 and Update</button>

      <h1>Default H1 Text</h1>
    </div>
  );
};

export default Dashboard;
