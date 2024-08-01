// const express = require('express');
// const router = express.Router();
// const taskController = require('../controllers/taskController');

// router.get('/:userId', taskController.getTasksByUserId);
// router.put('/:taskId', taskController.updateTaskStatus);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { getTasksByUserId, updateTaskStatus, createTask } = require('../controllers/taskController');

router.get('/:userId', getTasksByUserId);
router.put('/:taskId', updateTaskStatus);
router.post('/', createTask); // Add this route

module.exports = router;
