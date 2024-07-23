import React, { useState, useEffect } from 'react';
import './DashboardEmployee.css';
import { useUser } from '../../UserHandler/UserContext';
import axios from 'axios';

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:3000';

const Dashboard = () => {
  const { user } = useUser();
  const [clockedIn, setClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('Absensi');
  const [tasks, setTasks] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/api/tasks/${user.id}`);
        console.log('Fetched tasks:', response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`/api/attendance/${user.id}`);
        console.log('Fetched attendance:', response.data);
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchTasks();
    fetchAttendance();
  }, [user.id]);

  const handleClockIn = async () => {
    const now = new Date();
    setClockedIn(true);

    try {
      await axios.post('/api/attendance/clockin', {
        user_id: user.id,
        clock_in: now.toTimeString().split(' ')[0],
        date: now.toISOString().split('T')[0]
      });

      const response = await axios.get(`/api/attendance/${user.id}`);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error recording clock in:', error);
    }
  };

  const handleClockOut = async () => {
    const now = new Date();
    setClockedIn(false);

    try {
      await axios.put('/api/attendance/clockout', {
        user_id: user.id,
        clock_out: now.toTimeString().split(' ')[0],
        date: now.toISOString().split('T')[0]
      });

      const response = await axios.get(`/api/attendance/${user.id}`);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error recording clock out:', error);
    }
  };

  const handleTaskSubmit = async () => {
    try {
      await Promise.all(tasks.map(task => axios.put(`/api/tasks/${task.id}`, { status: task.status })));
      
      // Fetch tasks again to update the list
      const response = await axios.get(`/api/tasks/${user.id}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  };

  const handleTaskChange = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'done' ? 'ongoing' : 'done';
        const confirmChange = window.confirm(`Are you sure you want to mark this task as ${newStatus}?`);
        if (confirmChange) {
          return { ...task, status: newStatus };
        }
      }
      return task;
    }));
  };

  const ongoingTasks = tasks.filter(task => task.status === 'ongoing');
  const finishedTasks = tasks.filter(task => task.status === 'done');

  // Filter today's attendance
  const todayDate = new Date().toISOString().split('T')[0];
  const todaysAttendance = attendance.find(entry => entry.date === todayDate);

  return (
    <div className="dashboard-container">
      <div className="tabs">
        <div className={`tab ${activeTab === 'Absensi' ? 'active' : ''}`} onClick={() => setActiveTab('Absensi')}>Absensi</div>
        <div className={`tab ${activeTab === 'Tasks' ? 'active' : ''}`} onClick={() => setActiveTab('Tasks')}>Tasks</div>
      </div>
      {activeTab === 'Absensi' && (
        <div className="performance">
          <h2>Today's Attendance</h2>
          <div className="days">
            <div className="day-card">
              <h3>{todaysAttendance ? todaysAttendance.date : todayDate}</h3>
              <p>Clock in: {todaysAttendance ? todaysAttendance.clock_in : 'Pending'}</p>
              <p>Clock out: {todaysAttendance ? todaysAttendance.clock_out : 'Pending'}</p>
            </div>
          </div>
          <div className="clock-in-out">
            <button onClick={handleClockIn}>CLOCK IN</button>
            <button onClick={handleClockOut}>CLOCK OUT</button>
          </div>
        </div>
      )}
      {activeTab === 'Tasks' && (
        <div className="tasks">
          <h2>Today's tasks</h2>
          <div className="tasks-container">
            <div className="tasks-column">
              <h3>Ongoing Tasks</h3>
              {ongoingTasks.length > 0 ? (
                <ul>
                  {ongoingTasks.map(task => (
                    <li key={task.id}>
                      <input
                        type="checkbox"
                        checked={task.status === 'done'}
                        onChange={() => handleTaskChange(task.id)}
                      />
                      <strong>{task.task_name}</strong>
                      <p>{task.task_details}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No ongoing tasks.</p>
              )}
            </div>
            <div className="tasks-column">
              <h3>Finished Tasks</h3>
              {finishedTasks.length > 0 ? (
                <ul>
                  {finishedTasks.map(task => (
                    <li key={task.id}>
                      <input
                        type="checkbox"
                        checked={task.status === 'done'}
                        onChange={() => handleTaskChange(task.id)}
                      />
                      <strong>{task.task_name}</strong>
                      <p>{task.task_details}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No finished tasks.</p>
              )}
            </div>
          </div>
          <button onClick={handleTaskSubmit}>Submit Tasks</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
