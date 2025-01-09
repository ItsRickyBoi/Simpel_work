const bcrypt = require('bcrypt');  // Ensure bcrypt is imported
const User = require('../models/userModel');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { first_name, last_name, username, password, division, division_role, company_tag } = req.body;
        
        // Check if all required fields are present
        if (!first_name || !last_name || !username || !password || !division || !division_role || !company_tag) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if username already exists for the same company_tag
        const existingUser = await User.findOne({ where: { username, company_tag } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists for this company' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user with the hashed password
        const newUser = await User.create({
            first_name,
            last_name,
            username,
            password: hashedPassword,
            division,
            division_role,
            company_tag
        });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get users by company tag
const getUsersByCompanyTag = async (req, res) => {
    try {
        const users = await User.findAll({ where: { company_tag: req.params.company_tag, role: 'employee' } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// New controller function for updating password
const updateUserPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [updated] = await User.update({ password: hashedPassword }, {
            where: { id }
        });
        if (updated) {
            res.status(200).json({ message: 'Password updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error updating password' });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUsersByCompanyTag, updateUserPassword };
