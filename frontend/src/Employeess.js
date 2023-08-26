import React, { useState, useEffect } from 'react';

function Employeess() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        const data = await response.json(); // Convert response to JSON
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.firstname} {employee.lastname} - {employee.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employeess;
