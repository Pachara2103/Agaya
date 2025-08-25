const express = require('express')
const http = require("http");
const dotenv = require('dotenv') 
<<<<<<< HEAD
const app = require("./app.js");
const login = require('./routes/signin')
||||||| ab5b161
const app = express();
const login = require('./routes/signin')
=======
const app = express();
>>>>>>> aaa823559872d2110a594eda4321e40a8fd99b49
const connectDB = require('./config/db')
dotenv.config({path: '.env'});
connectDB();

const server = http.createServer(app);  

const port = process.env.PORT;

server.listen(port, () => {
    console.log('Server running at port', port);
});