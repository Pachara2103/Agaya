const express = require('express');
const http = require("http");
const dotenv = require('dotenv');
const app = require("./app.js");

dotenv.config({path: '.env'});

const connectDB = require('./config/db');
connectDB();

const server = http.createServer(app);  

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Server running at port', port);
});