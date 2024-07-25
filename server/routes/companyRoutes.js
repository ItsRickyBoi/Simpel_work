// const express = require('express');
// const router = express.Router();
// const User = require('../models/userModel');

// router.get('/company/:companyTag', async (req, res) => {
//   const { companyTag } = req.params;

//   try {
//     const users = await User.findAll({ where: { company_tag: companyTag } });
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Company = require('../models/companyModel');

// Get company data by tag
router.get('/:companyTag', async (req, res) => {
  const { companyTag } = req.params;

  try {
    const company = await Company.findOne({ where: { company_tag: companyTag } });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update company data by tag
router.put('/:companyTag', async (req, res) => {
  const { companyTag } = req.params;
  const { name, company_address, company_email, contact } = req.body;

  try {
    const company = await Company.findOne({ where: { company_tag: companyTag } });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    company.name = name;
    company.company_address = company_address;
    company.company_email = company_email;
    company.contact = contact;

    await company.save();
    res.json({ message: 'Company details updated successfully', company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
