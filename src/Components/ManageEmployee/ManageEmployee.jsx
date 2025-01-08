import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageEmployee.css';
import { useUser } from '../../UserHandler/UserContext';

const ManageEmployees = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('Employee');
  const [employeeForm, setEmployeeForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    division: '',
    division_role: 'member'
  });
  const [taskForm, setTaskForm] = useState({
    employeeName: '',
    taskName: '',
    taskDetails: '',
    taskIssuer: user ? `${user.first_name} ${user.last_name}` : '',
    employeeDivision: ''
  });
  const [removeForm, setRemoveForm] = useState({
    employeeName: ''
  });
  const [attendanceForm, setAttendanceForm] = useState({
    employeeName: '',
    clockIn: '',
    clockOut: ''
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`/api/users/company/${user.company_tag}`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [user.company_tag]);

  const handleEmployeeFormChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRemoveFormChange = (e) => {
    const { name, value } = e.target;
    setRemoveForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAttendanceFormChange = (e) => {
    const { name, value } = e.target;
    setAttendanceForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    const confirmCreate = window.confirm('Are you sure you want to create this employee?');
    if (!confirmCreate) return;

    try {
      const response = await axios.post('/api/users', {
        ...employeeForm,
        company_tag: user.company_tag
      });
      setEmployees([...employees, response.data]);
      setEmployeeForm({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        division: '',
        division_role: 'member'
      });
      alert('Employee created successfully');
    } catch (error) {
      console.error('Error creating employee:', error.response || error);
      alert('Failed to create employee');
    }
  };

  const handleSendTask = async (e) => {
    e.preventDefault();
    const selectedEmployee = employees.find(emp => emp.username === taskForm.employeeName);
    if (!selectedEmployee) {
      alert('Employee not found');
      return;
    }

    try {
      await axios.post('/api/tasks', {
        task_name: taskForm.taskName,
        task_details: taskForm.taskDetails,
        status: 'ongoing',
        issued_by: user.id,
        assigned_to: selectedEmployee.id,
        division: selectedEmployee.division,
        issuer_name: taskForm.taskIssuer,
        company_tag: user.company_tag
      });
      setTaskForm({
        employeeName: '',
        taskName: '',
        taskDetails: '',
        taskIssuer: user ? `${user.first_name} ${user.last_name}` : '',
        employeeDivision: ''
      });
      alert('Task assigned successfully');
    } catch (error) {
      console.error('Error sending task:', error.response || error);
      alert('Failed to assign task');
    }
  };

  const handleRemoveEmployee = async (e) => {
    e.preventDefault();
    const confirmRemove = window.confirm('Are you sure you want to remove this employee?');
    if (!confirmRemove) return;

    const employeeToRemove = employees.find(emp => emp.username === removeForm.employeeName);
    if (!employeeToRemove) {
      alert('Employee not found');
      return;
    }

    try {
      await axios.delete(`/api/users/${employeeToRemove.id}`);
      setEmployees(employees.filter(emp => emp.id !== employeeToRemove.id));
      setRemoveForm({ employeeName: '' });
      alert('Employee removed successfully');
    } catch (error) {
      console.error('Error removing employee:', error.response || error);
      alert('Failed to remove employee');
    }
  };

  const handleUpdateAttendance = async (e) => {
    e.preventDefault();
    const selectedEmployee = employees.find(emp => emp.username === attendanceForm.employeeName);
    if (!selectedEmployee) {
      alert('Employee not found');
      return;
    }

    try {
      await axios.put(`/api/attendance/update/${selectedEmployee.id}`, {
        clock_in: attendanceForm.clockIn || undefined,
        clock_out: attendanceForm.clockOut || undefined,
        date: new Date().toISOString().split('T')[0] // Use today's date
      });
      setAttendanceForm({
        employeeName: '',
        clockIn: '',
        clockOut: ''
      });
      alert('Attendance updated successfully');
    } catch (error) {
      console.error('Error updating attendance:', error.response || error);
      alert('Failed to update attendance');
    }
  };

  return (
    <div className="manage-employees-container-custom">
      <div className="manage-employees-tabs-custom">
        <div className={`manage-employees-tab-custom ${activeTab === 'Employee' ? 'active' : ''}`} onClick={() => setActiveTab('Employee')}>Employee</div>
        <div className={`manage-employees-tab-custom ${activeTab === 'Task' ? 'active' : ''}`} onClick={() => setActiveTab('Task')}>Task</div>
        <div className={`manage-employees-tab-custom ${activeTab === 'Remove' ? 'active' : ''}`} onClick={() => setActiveTab('Remove')}>Remove</div>
        <div className={`manage-employees-tab-custom ${activeTab === 'Attendance' ? 'active' : ''}`} onClick={() => setActiveTab('Attendance')}>Edit Attendance</div>
      </div>
      {activeTab === 'Employee' && (
        <div className="manage-employees-form-container-custom">
          <h2>Add New Employee</h2>
          <form className="custom-form" onSubmit={handleCreateEmployee}>
            <input type="text" name="first_name" placeholder="Employee First Name" value={employeeForm.first_name} onChange={handleEmployeeFormChange} />
            <input type="text" name="last_name" placeholder="Employee Last Name" value={employeeForm.last_name} onChange={handleEmployeeFormChange} />
            <input type="text" name="username" placeholder="Employee Username" value={employeeForm.username} onChange={handleEmployeeFormChange} />
            <input type="password" name="password" placeholder="Employee Password" value={employeeForm.password} onChange={handleEmployeeFormChange} />
            <input type="text" name="division" placeholder="Employee Division" value={employeeForm.division} onChange={handleEmployeeFormChange} />
            <select name="division_role" value={employeeForm.division_role} onChange={handleEmployeeFormChange}>
              <option value="head">Head</option>
              <option value="member">Member</option>
            </select>
            <button type="submit">Create Employee</button>
          </form>
        </div>
      )}
      {activeTab === 'Task' && (
        <div className="manage-employees-form-container-custom">
          <h2>Assign New Task</h2>
          <form className="custom-form" onSubmit={handleSendTask}>
            <select name="employeeName" value={taskForm.employeeName} onChange={handleTaskFormChange}>
              <option value="">Choose Employee Name</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.username}>{emp.first_name} {emp.last_name}</option>
              ))}
            </select>
            <input type="text" name="taskName" placeholder="Task Name" value={taskForm.taskName} onChange={handleTaskFormChange} />
            <textarea name="taskDetails" placeholder="Task Details" value={taskForm.taskDetails} onChange={handleTaskFormChange}></textarea>
            <input type="text" name="taskIssuer" placeholder="Task Issuer" value={taskForm.taskIssuer} readOnly />
            <input type="text" name="employeeDivision" placeholder="Employee's Division" value={employees.find(emp => emp.username === taskForm.employeeName)?.division || ''} readOnly />
            <button type="submit">Send Task</button>
          </form>
        </div>
      )}
      {activeTab === 'Remove' && (
        <div className="manage-employees-form-container-custom">
          <h2>Fire Employee</h2>
          <form className="custom-form" onSubmit={handleRemoveEmployee}>
            <select name="employeeName" value={removeForm.employeeName} onChange={handleRemoveFormChange}>
              <option value="">Choose Employee Name</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.username}>{emp.first_name} {emp.last_name}</option>
              ))}
            </select>
            <button type="submit">Fire Employee</button>
          </form>
        </div>
      )}
      {activeTab === 'Attendance' && (
        <div className="manage-employees-form-container-custom">
          <h2>Edit Attendance</h2>
          <form className="custom-form" onSubmit={handleUpdateAttendance}>
            <select name="employeeName" value={attendanceForm.employeeName} onChange={handleAttendanceFormChange}>
              <option value="">Choose Employee Name</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.username}>{emp.first_name} {emp.last_name}</option>
              ))}
            </select>
            <input type="time" name="clockIn" placeholder="Clock In Time" value={attendanceForm.clockIn} onChange={handleAttendanceFormChange} />
            <input type="time" name="clockOut" placeholder="Clock Out Time" value={attendanceForm.clockOut} onChange={handleAttendanceFormChange} />
            <button type="submit">Update Attendance</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageEmployees;
