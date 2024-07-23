import React from 'react';
import './EditCompany.css';
import { useUser } from '../../UserHandler/UserContext';

const EditCompany = () => {
  const { user } = useUser();
  
  // Dummy company data
  const company = {
    name: 'Company Name',
    address: 'Company Address',
    tag: user.companyTag,
    email: 'company@example.com',
    contact: '1234567890'
  };

  return (
    <div className="edit-company-container">
      <div className="edit-company-card">
        <h2>Edit Company</h2>
        <div className="input-group">
          <label>Company name</label>
          <input type="text" defaultValue={company.name} />
        </div>
        <div className="input-group">
          <label>Address</label>
          <input type="text" defaultValue={company.address} />
        </div>
        <div className="input-group">
          <label>Company tag</label>
          <input type="text" value={company.tag} readOnly />
        </div>
        <div className="input-group">
          <label>Company Email</label>
          <input type="email" defaultValue={company.email} />
        </div>
        <div className="input-group">
          <label>Company contact</label>
          <input type="text" defaultValue={company.contact} />
        </div>
        <button className="apply-button">Apply</button>
      </div>
    </div>
  );
};

export default EditCompany;
