const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');  // Ensure bcryptjs is imported
const User = require('../models/userModel');
const Company = require('../models/companyModel');

// Registration route
router.post('/register', async (req, res) => {
    const {
        companyName,
        companyTag,
        ceoFirstName,
        ceoLastName,
        ceoEmail,
        companyAddress,
        companyEmail,
        username,
        password
    } = req.body;

    if (!companyName || !companyTag || !ceoFirstName || !ceoLastName || !ceoEmail || !companyAddress || !companyEmail || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingCompany = await Company.findOne({ where: { company_tag: companyTag } });
        if (existingCompany) {
            return res.status(400).json({ error: 'Company tag already exists' });
        }

        const existingUser = await User.findOne({ where: { username, company_tag: companyTag } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists for this company' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const company = await Company.create({
            name: companyName,
            company_tag: companyTag,
            company_address: companyAddress,
            company_email: companyEmail,
        });

        await User.create({
            first_name: ceoFirstName,
            last_name: ceoLastName,
            username,
            password: hashedPassword,
            email: ceoEmail,
            company_tag: companyTag,
            role: 'ceo',
            division: 'Management' // Set a default division
        });

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error during registration process:', error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password, company_tag } = req.body;

    try {
        const user = await User.findOne({ where: { username, company_tag } });

        if (!user) {
            console.log('User not found with the given username and company tag');
            return res.status(401).json({ error: 'Invalid username, password, or company ID' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Password is invalid');
            return res.status(401).json({ error: 'Invalid username, password, or company ID' });
        }

        // Set up session
        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role,
            company_tag: user.company_tag,
            first_name: user.first_name,
            last_name: user.last_name
        };

        res.json(req.session.user);
    } catch (error) {
        console.log('Error during login process:', error);
        res.status(500).json({ error: error.message });
    }
});

// Check session route
router.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ error: 'No active session' });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ message: 'Logout successful' });
    });
});

module.exports = router;
