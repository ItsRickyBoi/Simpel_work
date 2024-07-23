const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/company/:companyTag', async (req, res) => {
  const { companyTag } = req.params;

  try {
    const users = await User.findAll({ where: { company_tag: companyTag } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
