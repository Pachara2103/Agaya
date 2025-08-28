const express = require('express');
const http = require("http");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = require("./app.js");
// const login = require('./routes/signin')

//Load env vars
dotenv.config({path: 'config/config.env'});
const connectDB = require('./config/db')
connectDB();

const server = http.createServer(app);  

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Server running at port', port);
});