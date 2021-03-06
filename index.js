const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Create the server
const app = express();

// DB Connection
connectDB();

// Enable cors
app.use(cors());

// Enable express.json
app.use(express.json({ extended: true }));

// Server port
const port = process.env.port || 4000;

// Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running in the port ${port}`);
})