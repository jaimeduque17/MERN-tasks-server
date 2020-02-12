const express = require('express');

// Create the server
const app = express();

// Server port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
    console.log(`The server is running in the port ${PORT}`);
})