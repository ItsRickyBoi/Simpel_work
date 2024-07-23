const bcrypt = require('bcrypt');
const User = require('./models/userModel');

const hashExistingPasswords = async () => {
    try {
        const users = await User.findAll();

        for (const user of users) {
            if (!user.password.startsWith('$2b$')) { // Check if the password is not already hashed
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
                await user.save();
                console.log(`Password for user ${user.username} has been hashed.`);
            }
        }

        console.log('All user passwords have been hashed.');
    } catch (error) {
        console.error('Error hashing passwords:', error);
    }
};

hashExistingPasswords();
