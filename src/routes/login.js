var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
const { generateToken } = require('../services/jwtGenerator');

module.exports = function (getPool) {

    router.post('/', async (req, res) => {
        console.log('Auth request received');

        const users = [
            { id: 1, username: 'user1', password: bcrypt.hashSync('password123', 4) } // Password is hashed
        ];
        const user = users.find(u => u.username === req.body.username);
        if (!user) {
            return res.status(400).send({ message: 'Invalid username or password' });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: 'Invalid username or password' });
        }
            
        // Generate JWT token
        const token = generateToken(users[0]);
        res.status(201).send({ message: 'Token created succesfully', token: token });
    });

    return router;
};