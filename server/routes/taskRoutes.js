const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/:userId', taskController.getTasksByUserId);
router.put('/:taskId', taskController.updateTaskStatus);

module.exports = router;
