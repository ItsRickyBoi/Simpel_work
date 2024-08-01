const bcrypt = require('bcryptjs');  // Ensure bcryptjs is imported
const User = require('../models/userModel');

const loginUser = async (req, res) => {
    const { username, password, company_tag } = req.body;

    try {
        const user = await User.findOne({ where: { username, company_tag } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const userData = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            role: user.role,
            company_tag: user.company_tag
        };

        res.json(userData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { loginUser };
