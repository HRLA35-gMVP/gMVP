// Dependencies
const express = require('express');
const path = require('path');

// Declarations
const server = express();
const port = 3001;

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../client/dist')));

// Server actuation
server.listen(port, () => console.log(`Working out on port: ${port}`));
