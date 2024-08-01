// const Task = require('../models/taskModel');

// exports.getTasksByUserId = async (req, res) => {
//     console.log(`Fetching tasks for user ID: ${req.params.userId}`);
//     try {
//         const tasks = await Task.findAll({
//             where: {
//                 assigned_to: req.params.userId
//             }
//         });
//         res.status(200).json(tasks);
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         res.status(500).json({ message: 'Error fetching tasks', error });
//     }
// };

// exports.updateTaskStatus = async (req, res) => {
//     console.log(`Updating task ID: ${req.params.taskId}`);
//     try {
//         const task = await Task.findByPk(req.params.taskId);
//         if (task) {
//             await task.update({ status: req.body.status });
//             res.status(200).json({ message: 'Task updated successfully' });
//         } else {
//             res.status(404).json({ message: 'Task not found' });
//         }
//     } catch (error) {
//         console.error('Error updating task:', error);
//         res.status(500).json({ message: 'Error updating task', error });
//     }
// };


// const Task = require('../models/taskModel');

// // Create a new task
// exports.createTask = async (req, res) => {
//     try {
//         const newTask = await Task.create(req.body);
//         res.status(201).json(newTask);
//     } catch (error) {
//         console.error('Error creating task:', error);
//         res.status(500).json({ message: 'Error creating task', error });
//     }
// };

// // Get tasks by user ID
// exports.getTasksByUserId = async (req, res) => {
//     console.log(`Fetching tasks for user ID: ${req.params.userId}`);
//     try {
//         const tasks = await Task.findAll({
//             where: {
//                 assigned_to: req.params.userId
//             }
//         });
//         res.status(200).json(tasks);
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         res.status(500).json({ message: 'Error fetching tasks', error });
//     }
// };

// // Update task status
// exports.updateTaskStatus = async (req, res) => {
//     console.log(`Updating task ID: ${req.params.taskId}`);
//     try {
//         const task = await Task.findByPk(req.params.taskId);
//         if (task) {
//             await task.update({ status: req.body.status });
//             res.status(200).json({ message: 'Task updated successfully' });
//         } else {
//             res.status(404).json({ message: 'Task not found' });
//         }
//     } catch (error) {
//         console.error('Error updating task:', error);
//         res.status(500).json({ message: 'Error updating task', error });
//     }
// };

const Task = require('../models/taskModel');
const User = require('../models/userModel'); // Import the User model

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

// Add this function to create a task
exports.createTask = async (req, res) => {
    console.log('Creating new task:', req.body);
    try {
        const { task_name, task_details, issued_by, assigned_to, division, issuer_name, company_tag } = req.body;
        
        // Check if all required fields are present
        if (!task_name || !task_details || !issued_by || !assigned_to || !division || !issuer_name || !company_tag) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newTask = await Task.create({
            task_name,
            task_details,
            status: 'ongoing',
            issued_by,
            assigned_to,
            division,
            issuer_name,
            company_tag
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task', error });
    }
};
