import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [companyTag, setCompanyTag] = useState('');
  const [ceoFirstName, setCeoFirstName] = useState('');
  const [ceoLastName, setCeoLastName] = useState('');
  const [ceoEmail, setCeoEmail] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tosAccepted, setTosAccepted] = useState(false);
  const [notification, setNotification] = useState('');

  const navigate = useNavigate();

  const nextStep = () => {
    if (step === 1 && (!companyName || !companyTag)) {
      setNotification('Company name and tag are required.');
      return;
    }
    if (step === 2 && (!ceoFirstName || !ceoLastName || !ceoEmail)) {
      setNotification('CEO information is required.');
      return;
    }
    if (step === 3 && (!companyAddress || !companyEmail || !username || !password || !confirmPassword)) {
      setNotification('All fields are required.');
      return;
    }
    setNotification('');
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const handleRegister = async () => {
    if (!tosAccepted) {
      alert('You must accept the terms of service to register.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    const newUser = {
      companyName,
      companyTag,
      ceoFirstName,
      ceoLastName,
      ceoEmail,
      companyAddress,
      companyEmail,
      username,
      password,
    };
    try {
      await axios.post('http://localhost:3306/api/auth/register', newUser);
      alert('Registration successful! Redirecting to login page...');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setNotification('Registration failed. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="register-card">
            <h2>Start Managing your Company</h2>
            <input
              type="text"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter unique tag"
              value={companyTag}
              onChange={(e) => setCompanyTag(e.target.value)}
              required
            />
            <button onClick={nextStep} className="next-button">Next ➞</button>
          </div>
        );
      case 2:
        return (
          <div className="register-card">
            <h2>Information of CEO</h2>
            <input
              type="text"
              placeholder="First name"
              value={ceoFirstName}
              onChange={(e) => setCeoFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              value={ceoLastName}
              onChange={(e) => setCeoLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={ceoEmail}
              onChange={(e) => setCeoEmail(e.target.value)}
              required
            />
            <button onClick={nextStep} className="next-button">Next ➞</button>
            <button onClick={previousStep} className="prev-button">← Previous</button>
          </div>
        );
      case 3:
        return (
          <div className="register-card">
            <h2>Information of Company</h2>
            <input
              type="text"
              placeholder="Address"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Company's email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button onClick={nextStep} className="next-button">Next ➞</button>
            <button onClick={previousStep} className="prev-button">← Previous</button>
          </div>
        );
      case 4:
        return (
          <div className="register-card">
            <h2>Terms of Service</h2>
            <div className="tos-content">
              <p>Term of service bla bla bla...</p>
              <p>Term of service bla bla bla...</p>
              <p>Term of service bla bla bla...</p>
              <p>Term of service bla bla bla...</p>
              <p>Term of service bla bla bla...</p>
              <p>Term of service bla bla bla...</p>
            </div>
            <div className="term-checkbox">
              <input
                className="term-checkbox-click"
                type="checkbox"
                id="terms"
                checked={tosAccepted}
                onChange={() => setTosAccepted(!tosAccepted)}
                required
              />
              <label className='term-text' htmlFor="terms">Checking this box means agreeing to the terms of service</label>
            </div>
            <button className="register-button" onClick={handleRegister}>Register ➞</button>
            <button onClick={previousStep} className="prev-button">← Previous</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="register-container">
      <div className="logo-placeholder">Logo Here</div>
      <div className="step-indicator">
        <span className={`step ${step >= 1 ? 'active' : ''}`}></span>
        <span className={`step ${step >= 2 ? 'active' : ''}`}></span>
        <span className={`step ${step >= 3 ? 'active' : ''}`}></span>
        <span className={`step ${step >= 4 ? 'active' : ''}`}></span>
      </div>
      {notification && <p className="notification">{notification}</p>}
      {renderStep()}
    </div>
  );
};

export default Register;
