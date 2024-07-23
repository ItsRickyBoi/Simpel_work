const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

router.post('/login', async (req, res) => {
    const { username, password, company_tag } = req.body;

    try {
        const user = await User.findOne({ where: { username, company_tag } });

        if (!user) {
            console.log('User not found with the given username and company tag');
            return res.status(401).json({ error: 'Invalid username, password, or company ID' });
        }

        console.log('User found:', user);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Password is invalid');
            return res.status(401).json({ error: 'Invalid username, password, or company ID' });
        }

        res.json({
            id: user.id,
            username: user.username,
            role: user.role,
            company_tag: user.company_tag,
            first_name: user.first_name,
            last_name: user.last_name
        });
    } catch (error) {
        console.log('Error during login process:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
