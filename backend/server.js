require('dotenv').config({ path: '.env' });
const http = require("http");
const app = require("./app.js"); 
const connectDB = require('./config/db');
// remove unused import that will use in app.js
connectDB();

const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
});
