require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',  // Set to 'true' if using Azure
        trustServerCertificate: true, // Set to 'false' in production for security
    },
    pool: {
        max: 10, // Maximum number of connections
        min: 0,  // Minimum number of connections
        idleTimeoutMillis: 30000, // Connection idle timeout
    },
};

module.exports = dbConfig;
