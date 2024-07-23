const express = require('express');
const router = express.Router();
const Performance = require('../models/performanceModel');

router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const performanceData = await Performance.findOne({ where: { username } });
    res.json(performanceData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
