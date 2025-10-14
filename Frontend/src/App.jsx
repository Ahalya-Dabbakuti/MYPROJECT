import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import config from "./config";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    depart: "",
    jobTitle: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [fetchId, setFetchId] = useState("");
  const [fetchedEmployee, setFetchedEmployee] = useState(null);

   const baseUrl = `${config.url}/employeeapi`;

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      const res = await axios.get(`${baseUrl}/view`);
      setEmployees(res.data);
    } catch (error) {
      console.error(error.response || error);
      setMessage("Failed to fetch employees.");
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in employee) {
      if (!employee[key] || employee[key].toString().trim() === "") {
        setMessage(`Please fill out ${key}`);
        return false;
      }
    }
    return true;
  };

  const addEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, employee);
      setMessage("Employee added successfully.");
      fetchAllEmployees();
      resetForm();
    } catch (error) {
      console.error(error.response || error);
      setMessage("Error adding employee: " + (error.response?.data || error.message));
    }
  };

  const updateEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update/${employee.id}`, employee);
      setMessage("Employee updated successfully.");
      fetchAllEmployees();
      resetForm();
    } catch (error) {
      console.error(error.response || error);
      setMessage("Error updating employee: " + (error.response?.data || error.message));
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(`Employee deleted with ID ${id}`);
      fetchAllEmployees();
    } catch (error) {
      console.error(error.response || error);
      setMessage("Error deleting employee: " + (error.response?.data || error.message));
    }
  };

  const handleEdit = (emp) => {
    setEmployee({
      id: emp.id,
      name: emp.name,
      depart: emp.depart,
      jobTitle: emp.jobTitle
    });
    setEditMode(true);
    setMessage(`Editing employee ID ${emp.id}`);
  };

  const fetchEmployeeById = async () => {
    if (!fetchId) return setMessage("Enter ID to fetch");
    try {
      const res = await axios.get(`${baseUrl}/get/${fetchId}`);
      setFetchedEmployee(res.data);
      setMessage("");
    } catch (error) {
      console.error(error.response || error);
      setFetchedEmployee(null);
      setMessage("Employee not found.");
    }
  };

  const resetForm = () => {
    setEmployee({ id: "", name: "", depart: "", jobTitle: "" });
    setEditMode(false);
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Employee Management</h2>

        {message && (
          <div className={`message-banner ${message.toLowerCase().includes("error") ? "error" : "success"}`}>
            {message}
          </div>
        )}

        {/* Add / Edit Form */}
        <div className="form-section">
          <h3>{editMode ? "Edit Employee" : "Add Employee"}</h3>
          <input type="number" name="id" placeholder="ID" value={employee.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleChange} />
          <input type="text" name="depart" placeholder="Department" value={employee.depart} onChange={handleChange} />
          <input type="text" name="jobTitle" placeholder="Job Title" value={employee.jobTitle} onChange={handleChange} />

          <div className="btn-group">
            {!editMode ? (
              <button className="btn-blue" onClick={addEmployee}>Add</button>
            ) : (
              <>
                <button className="btn-green" onClick={updateEmployee}>Update</button>
                <button className="btn-gray" onClick={resetForm}>Cancel</button>
              </>
            )}
          </div>
        </div>

        {/* Fetch Employee By ID */}
        <div className="form-section">
          <h3>Fetch Employee By ID</h3>
          <input type="number" placeholder="Enter ID" value={fetchId} onChange={(e) => setFetchId(e.target.value)} />
          <button className="btn-blue" onClick={fetchEmployeeById}>Fetch</button>
          {fetchedEmployee && <pre>{JSON.stringify(fetchedEmployee, null, 2)}</pre>}
        </div>

        {/* Employee Table */}
        <div className="table-section">
          <h3>All Employees</h3>
          {employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Job Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.depart}</td>
                    <td>{emp.jobTitle}</td>
                    <td>
                      <button className="btn-green" onClick={() => handleEdit(emp)}>Edit</button>
                      <button className="btn-red" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
