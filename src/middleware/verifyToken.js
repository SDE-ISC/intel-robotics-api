const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    console.log('Verifying token:', token);
    console.log('Using secret:', JWT_SECRET);

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ message: 'Invalid Token' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
