const sql = require('mssql');
const config = require('../config/dbConfig');  // Adjust the path if needed

let poolPromise;

// Function to get or create the connection pool
const getPool = async () => {
    if (!poolPromise) {
        try {
            poolPromise = sql.connect(config);
            console.log('MSSQL connection pool created');
        } catch (err) {
            console.error('Error creating MSSQL pool:', err);
            throw err;
        }
    }
    return poolPromise;
};

module.exports = { getPool };
