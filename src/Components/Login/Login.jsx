import React, { useState } from 'react';
import './Login.css';
import { useUser } from '../../UserHandler/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://creamysite.my.id/api/auth/login', {
        username,
        password,
        company_tag: companyId,
      }, { withCredentials: true });

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
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        <p className="register-link">Want to start managing your company? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
