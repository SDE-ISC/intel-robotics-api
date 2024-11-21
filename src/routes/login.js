var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateUser } = require('../services/userService');
require('dotenv').config();

module.exports = function (getPool) {

    router.post('/', [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required')
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: errors.array() });
        }
        console.log('Auth request received');

        // Authenticate user
        const DoesExist = await authenticateUser(req.body.username, req.body.password);

        if (DoesExist){
            // Generate JWT token
            const accessToken = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(201).send({message: 'Login successful', token: accessToken});

        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }

    });

    return router;
};