const Admin = require('../model/adminModel');
const bcrypt = require('bcrypt');

// Create a new admin
const createAdmin = async (username, password) => {
    const admin = new Admin({ username, password });
    return await admin.save();
};

// Get an admin by username
const getAdminByUsername = async (username) => {
    return await Admin.findOne({ username });
};

// Validate admin credentials
const validateAdmin = async (username, password) => {
    const admin = await Admin.findOne({ username });

    if (!admin) {
        return null;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    return isMatch ? admin : null;
};

module.exports = {
    createAdmin,
    getAdminByUsername,
    validateAdmin,
};


// const signUp = async (data) => {
//     const admin = new Admin(data);
//     return await admin.save();
// };

// const login = async (username, password) => {
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//         throw new Error('Invalid username or password');
//     }

//     const isPasswordValid = await bcrypt.compare(password, admin.password);
//     if (!isPasswordValid) {
//         throw new Error('Invalid username or password');
//     }

//     return { message: 'Login successful' };
// };

// module.exports = { signUp, login };
