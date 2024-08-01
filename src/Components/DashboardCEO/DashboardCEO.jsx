
// import React, { useEffect, useState } from 'react';
// import './DashboardCEO.css';
// import { useUser } from '../../UserHandler/UserContext';
// import axios from 'axios'; // Import axios for making HTTP requests

// const DashboardCEO = () => {
//   const { user } = useUser();
//   const [currentDay, setCurrentDay] = useState('');
//   const [employeeData, setEmployeeData] = useState([]);

//   useEffect(() => {
//     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const todayIndex = new Date().getDay();
//     setCurrentDay(daysOfWeek[todayIndex]);

//     const fetchEmployeesAndAttendance = async () => {
//       try {
//         const response = await axios.get(`http://creamysite.my.id/api/users/company/${user.company_tag}`);
//         const employees = response.data;

//         const attendancePromises = employees.map(async (employee) => {
//           const attendanceResponse = await axios.get(`http://creamysite.my.id/api/attendance/${employee.id}`);
//           const todayAttendance = attendanceResponse.data.find(att => new Date(att.date).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]);
//           return {
//             ...employee,
//             clock_in: todayAttendance ? todayAttendance.clock_in : '-',
//             clock_out: todayAttendance ? todayAttendance.clock_out : '-',
//             tasks_done: todayAttendance ? todayAttendance.tasks_done : 0,
//           };
//         });

//         const employeesWithAttendance = await Promise.all(attendancePromises);
//         setEmployeeData(employeesWithAttendance);
//       } catch (error) {
//         console.error('Error fetching employee or attendance data:', error);
//       }
//     };

//     fetchEmployeesAndAttendance();
//   }, [user.company_tag]);

//   return (
//     <div className="dashboard-ceo-container">
//       <h2>List of Employees</h2>
//       <p>Day today: {currentDay}</p>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Clock in</th>
//             <th>Clock out</th>
//             <th>Task total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employeeData.map((employee, index) => (
//             <tr key={index}>
//               <td>{employee.first_name} {employee.last_name}</td>
//               <td>{employee.clock_in}</td>
//               <td>{employee.clock_out}</td>
//               <td>{employee.tasks_done}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DashboardCEO;

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

    const fetchEmployeesAndAttendanceAndTasks = async () => {
      try {
        const response = await axios.get(`http://creamysite.my.id/api/users/company/${user.company_tag}`);
        const employees = response.data;

        const attendanceAndTasksPromises = employees.map(async (employee) => {
          const attendanceResponse = await axios.get(`http://creamysite.my.id/api/attendance/${employee.id}`);
          const todayAttendance = attendanceResponse.data.find(att => new Date(att.date).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]);

          const tasksResponse = await axios.get(`http://creamysite.my.id/api/tasks/${employee.id}`);
          const doneTasksCount = tasksResponse.data.filter(task => task.status === 'done').length;

          return {
            ...employee,
            clock_in: todayAttendance ? todayAttendance.clock_in : '-',
            clock_out: todayAttendance ? todayAttendance.clock_out : '-',
            tasks_done: doneTasksCount,
          };
        });

        const employeesWithAttendanceAndTasks = await Promise.all(attendanceAndTasksPromises);
        setEmployeeData(employeesWithAttendanceAndTasks);
      } catch (error) {
        console.error('Error fetching employee, attendance or tasks data:', error);
      }
    };

    fetchEmployeesAndAttendanceAndTasks();
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
              <td>{employee.clock_in}</td>
              <td>{employee.clock_out}</td>
              <td>{employee.tasks_done}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardCEO;
