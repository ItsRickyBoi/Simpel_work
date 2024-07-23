/*
import React, { useEffect, useState } from 'react';
import './DashboardCEO.css';
import { useUser } from '../../UserHandler/UserContext';
import axios from 'axios';

const DashboardCEO = () => {
  const { user } = useUser();
  const [currentDay, setCurrentDay] = useState('');
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayIndex = new Date().getDay();
    setCurrentDay(daysOfWeek[todayIndex]);

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/company/${user.company_tag}`);
        const companyEmployees = response.data.filter(emp => emp.role !== 'ceo');

        const attendancePromises = companyEmployees.map(async employee => {
          const attendanceResponse = await axios.get(`http://localhost:3000/api/attendance/${employee.id}`);
          const attendanceData = attendanceResponse.data;

          const todayAttendance = attendanceData.find(att => new Date(att.date).getDay() === todayIndex) || {
            clock_in: '-',
            clock_out: '-',
            tasks_done: 0,
          };

          return {
            name: `${employee.first_name} ${employee.last_name}`,
            clockIn: todayAttendance.clock_in,
            clockOut: todayAttendance.clock_out,
            tasksDone: todayAttendance.tasks_done,
          };
        });

        const data = await Promise.all(attendancePromises);
        setEmployeeData(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, [user.company_tag]);

  return (
    <div className="dashboard-ceo-container">
      <h2>List of Employees</h2>
      <p>Day today: {currentDay}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Clock in</th>
            <th>Clock out</th>
            <th>Task total</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.clockIn}</td>
              <td>{employee.clockOut}</td>
              <td>{employee.tasksDone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardCEO;
*/

import React, { useEffect, useState } from 'react';
import './DashboardCEO.css';
import { useUser } from '../../UserHandler/UserContext';
import axios from 'axios'; // Import axios for making HTTP requests

const DashboardCEO = () => {
  const { user } = useUser();
  const [currentDay, setCurrentDay] = useState('');
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayIndex = new Date().getDay();
    setCurrentDay(daysOfWeek[todayIndex]);

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/company/${user.company_tag}`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, [user.company_tag]);

  return (
    <div className="dashboard-ceo-container">
      <h2>List of Employees</h2>
      <p>Day today: {currentDay}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Clock in</th>
            <th>Clock out</th>
            <th>Task total</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.first_name} {employee.last_name}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardCEO;
