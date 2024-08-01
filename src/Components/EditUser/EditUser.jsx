// EditUser.jsx
import React, { useState } from 'react';
import './EditUser.css';
import { useUser } from '../../UserHandler/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put(`http://creamysite.my.id/api/users/${user.id}/password`, { password });
      setMessage(response.data.message);

      // Log out the user and navigate to the login page with a success message
      logout();
      navigate(`/login?message=${encodeURIComponent('Password changed successfully. Please log in with your new password.')}`);
    } catch (error) {
      setMessage('Error updating password');
    }
  };

  return (
    <div className="edit-user-container">
      <div className="edit-user-card">
        <h2>Edit User</h2>
        <div className="input-group">
          <label>First name</label>
          <input type="text" value={user.first_name} readOnly />
        </div>
        <div className="input-group">
          <label>Last name</label>
          <input type="text" value={user.last_name} readOnly />
        </div>
        <div className="input-group">
          <label>Username</label>
          <input type="text" value={user.username} readOnly />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter new password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input 
            type="password" 
            placeholder="Confirm new password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        {message && <p className="message">{message}</p>}
        <button className="apply-button" onClick={handlePasswordChange}>Apply</button>
      </div>
    </div>
  );
};

export default EditUser;
