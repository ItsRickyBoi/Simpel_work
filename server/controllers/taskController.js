const Task = require('../models/taskModel');

exports.getTasksByUserId = async (req, res) => {
    console.log(`Fetching tasks for user ID: ${req.params.userId}`);
    try {
        const tasks = await Task.findAll({
            where: {
                assigned_to: req.params.userId
            }
        });
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

exports.updateTaskStatus = async (req, res) => {
    console.log(`Updating task ID: ${req.params.taskId}`);
    try {
        const task = await Task.findByPk(req.params.taskId);
        if (task) {
            await task.update({ status: req.body.status });
            res.status(200).json({ message: 'Task updated successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task', error });
    }
};
