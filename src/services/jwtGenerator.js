const jwt = require('jsonwebtoken');
require('dotenv').config();

// Secret key for signing the token (keep this secure)
const JWT_SECRET = process.env.JWT_KEY;

// Function to generate a token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: '1h' } // Options: token expires in 1 hour
    );
};

module.exports = { generateToken };
