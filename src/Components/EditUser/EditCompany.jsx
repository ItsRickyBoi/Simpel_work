// import React from 'react';
// import './EditCompany.css';
// import { useUser } from '../../UserHandler/UserContext';

// const EditCompany = () => {
//   const { user } = useUser();
  
//   // Dummy company data
//   const company = {
//     name: 'Company Name',
//     address: 'Company Address',
//     tag: user.companyTag,
//     email: 'company@example.com',
//     contact: '1234567890'
//   };

//   return (
//     <div className="edit-company-container">
//       <div className="edit-company-card">
//         <h2>Edit Company</h2>
//         <div className="input-group">
//           <label>Company name</label>
//           <input type="text" defaultValue={company.name} />
//         </div>
//         <div className="input-group">
//           <label>Address</label>
//           <input type="text" defaultValue={company.address} />
//         </div>
//         <div className="input-group">
//           <label>Company tag</label>
//           <input type="text" value={company.tag} readOnly />
//         </div>
//         <div className="input-group">
//           <label>Company Email</label>
//           <input type="email" defaultValue={company.email} />
//         </div>
//         <div className="input-group">
//           <label>Company contact</label>
//           <input type="text" defaultValue={company.contact} />
//         </div>
//         <button className="apply-button">Apply</button>
//       </div>
//     </div>
//   );
// };

// export default EditCompany;

// import React, { useState, useEffect } from 'react';
// import './EditCompany.css';
// import { useUser } from '../../UserHandler/UserContext';
// import axios from 'axios';

// const EditCompany = () => {
//   const { user } = useUser();
//   const [company, setCompany] = useState(null);

//   // Log user data to debug
//   console.log('User data:', user);

//   useEffect(() => {
//     const fetchCompany = async () => {
//       try {
//         if (user && user.company_tag) {
//           const response = await axios.get(`http://creamysite.my.id/api/company/${user.company_tag}`);
//           setCompany(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching company data:', error);
//       }
//     };

//     fetchCompany();
//   }, [user]);

//   if (!company) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="edit-company-container">
//       <div className="edit-company-card">
//         <h2>Edit Company</h2>
//         <div className="input-group">
//           <label>Company name</label>
//           <input type="text" defaultValue={company.name} />
//         </div>
//         <div className="input-group">
//           <label>Address</label>
//           <input type="text" defaultValue={company.company_address} />
//         </div>
//         <div className="input-group">
//           <label>Company tag</label>
//           <input type="text" value={company.company_tag} readOnly />
//         </div>
//         <div className="input-group">
//           <label>Company Email</label>
//           <input type="email" defaultValue={company.company_email} />
//         </div>
//         <button className="apply-button">Apply</button>
//       </div>
//     </div>
//   );
// };

// export default EditCompany;


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
      axios.get(`http://creamysite.my.id/api/company/${user.company_tag}`)
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
    axios.put(`http://creamysite.my.id/api/company/${user.company_tag}`, company)
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
          <input type="text" name="name" value={company.name} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Address</label>
          <input type="text" name="company_address" value={company.company_address} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Company tag</label>
          <input type="text" name="company_tag" value={company.company_tag} readOnly />
        </div>
        <div className="input-group">
          <label>Company Email</label>
          <input type="email" name="company_email" value={company.company_email} onChange={handleInputChange} />
        </div>
        <button className="apply-button" onClick={handleUpdate}>Apply</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default EditCompany;
