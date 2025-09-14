<<<<<<< HEAD
require('dotenv').config({ path: './config/config.env' });
||||||| 8833a62
require('dotenv').config({ path: '.env' });
=======
>>>>>>> 4fa6c6ae5a9c1c679bf58b642b15670b8e915504
const http = require("http");
const dotenv = require('dotenv') 
const app = require("./app.js");
const connectDB = require('./config/db')

connectDB();

const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
});
