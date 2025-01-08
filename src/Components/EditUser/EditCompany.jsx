import React, { useState, useEffect } from 'react';
import './EditCompany.css';
import { useUser } from '../../UserHandler/UserContext';
import axios from 'axios';

const EditCompany = () => {
  const { user } = useUser();
  const [company, setCompany] = useState({
    name: '',
    company_address: '',
    company_tag: '',
    company_email: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user && user.company_tag) {
      axios.get(`http://localhost:3000/api/company/${user.company_tag}`)
        .then(response => {
          setCompany(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('There was an error fetching the company data!', error);
          setIsLoading(false);
        });
    } else {
      console.error('No company_tag found in user context.');
      setIsLoading(false);
    }
  }, [user]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/api/company/${user.company_tag}`, company)
      .then(response => {
        setMessage('Company details updated successfully.');
      })
      .catch(error => {
        console.error('There was an error updating the company data!', error);
        setMessage('Failed to update company details.');
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-company-container">
      <div className="edit-company-card">
        <h2>Edit Company</h2>
        <div className="input-group">
          <label>Company name</label>
          <input type="text" id="company-name" name="name" value={company?.name || ''} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Address</label>
          <input type="text" id="company-address" name="company_address" value={company?.company_address || ''} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Company tag</label>
          <input type="text" id="company-tag" name="company_tag" value={company?.company_tag || ''} readOnly />
        </div>
        <div className="input-group">
          <label>Company Email</label>
          <input type="email" id="company-email" name="company_email" value={company?.company_email || ''} onChange={handleInputChange} />
        </div>
        <button className="apply-button" onClick={handleUpdate}>Apply</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default EditCompany;
