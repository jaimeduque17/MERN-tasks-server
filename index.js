const express = require('express');
const connectDB = require('./config/db');

// Create the server
const app = express();

// DB Connection
connectDB();

// Server port
const PORT = process.env.PORT || 4000;

// Import routes
app.use('/api/users', require('./routes/users'));

// Start the server
app.listen(PORT, () => {
    console.log(`The server is running in the port ${PORT}`);
})