// /client/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', jobRole: '', salary: '' });

  // Fetch employee data on load
  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new employee form
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/employees', formData)
      .then((response) => setEmployees([...employees, response.data]))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Employee Information</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="jobRole" value={formData.jobRole} onChange={handleChange} placeholder="Job Role" />
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" />
        <button type="submit">Add Employee</button>
      </form>

      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>{emp.name} - {emp.jobRole}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
