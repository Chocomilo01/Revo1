const adminService = require('../services/adminServices');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'your-secret-key'; // Replace with a secure key and store securely

// SignUp
const signUpAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the admin already exists
        const existingAdmin = await adminService.getAdminByUsername(username);
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: 'Admin already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const newAdmin = await adminService.createAdmin(username, hashedPassword);

        res.status(201).json({ success: true, data: newAdmin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate admin credentials
        const admin = await adminService.validateAdmin(username, password);

        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    signUpAdmin,
    loginAdmin,
};


// const signUp = async (req, res) => {
//     try {
//         const admin = await adminService.signUp(req.body);
//         res.status(201).json({ success: true, data: admin });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

// const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const response = await adminService.login(username, password);
//         res.status(200).json({ success: true, message: response.message });
//     } catch (error) {
//         res.status(401).json({ success: false, message: error.message });
//     }
// };

// module.exports = { signUp, login };
