var express = require('express');
var router = express.Router();
//const { getPool } = require('../middleware/database');
const verifyToken = require('../middleware/verifyToken');

module.exports = function (getPool) {
    router.get('/', async (req, res) => {
        try {
            const pool = await getPool();
            const result = await pool.request().query('SELECT * FROM Products');
            res.json(result.recordset);
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Product ID is required' });
        }
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('Id', id)
                .query('SELECT * FROM Products WHERE ProductID = @Id');
            if (result.recordset.length === 0) {
                return res.status(404).send({ message: 'Product not found' });
            }
            res.json(result.recordset[0]);
        } catch (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        }
    });
    
    router.post('/', async (req, res) => {
        try {
            const now = new Date(Date.now());
            const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
            const pool = await getPool();
            const result = await pool.request()
                .input('name', req.body.name)
                .input('price', req.body.price)
                .input('active', req.body.active)
                .input('description', req.body.description)
                .input('createdAt', formattedDate)
                .input('updatedAt', formattedDate)
                .input('groupId', req.body.groupId)
                .query('INSERT INTO Products (Name, Description, Active, Price, CreatedAt, UpdatedAt, GroupID) VALUES (@Name, @Description, @Active, @Price, @CreatedAt, @UpdatedAt, @GroupId)');
            res.status(201).send({ message: 'Product added successfully', productId: result.insertId });
        } catch (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    router.delete('/:id', verifyToken, async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Product ID is required' });
        }
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('Id', id) // Correct input parameter
                .query('DELETE FROM Products WHERE ProductID = @Id');
            
            if (result.rowsAffected[0] === 0) { // Check if any row was actually deleted
                return res.status(404).send({ message: 'Product not found' });
            }
    
            res.status(200).send({ message: 'Product deleted successfully' });
        } catch (err) {
            console.error('Error deleting data:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    router.put('/:id', verifyToken, async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Product ID is required' });
        }
        try {
            const now = new Date(Date.now());
            const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
            const pool = await getPool();
            const result = await pool.request()
                .input('Id', id)
                .input('name', req.body.name)
                .input('price', req.body.price)
                .input('active', req.body.active)
                .input('description', req.body.description)
                .input('updatedAt', formattedDate)
                .input('groupId', req.body.groupId)
                .query('UPDATE Products SET Name = @name, Description = @description, Active = @active, Price = @price, UpdatedAt = @updatedAt, GroupID = @groupId WHERE ProductID = @Id');
            if (result.rowsAffected[0] === 0) { // Check if any row was actually updated
                return res.status(404).send({ message: 'Product not found' });
            }
    
            res.status(200).send({ message: 'Product updated successfully' });
        } catch (err) {
            console.error('Error updating data:', err);
            res.status(500).send('Internal Server Error');
        }
    });
    
    return router;
};
