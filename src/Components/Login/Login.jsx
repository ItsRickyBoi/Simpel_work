// Login.jsx
import React, { useState, useEffect } from 'react';
import './Login.css';
import { useUser } from '../../UserHandler/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check for a success message in the URL
    const params = new URLSearchParams(location.search);
    const message = params.get('message');
    if (message) {
      setSuccessMessage(message);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
        company_tag: companyId,
      });

      login(response.data);
      navigate('/');
    } catch (err) {
      setError('Invalid username, password, or company ID');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-placeholder">LOGO HERE</div>
      <div className="login-card">
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">USERNAME</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="company-id">Company ID</label>
            <input 
              type="text" 
              id="company-id" 
              placeholder="Enter your company ID" 
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">PASSWORD</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        <p className="register-link">Want to start managing your company? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
