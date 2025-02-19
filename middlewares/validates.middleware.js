const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ success: false, message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = verified;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = adminAuth;
