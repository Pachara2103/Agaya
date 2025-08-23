const express = require('express')
const dotenv = require('dotenv') 
const app = express();
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'});
connectDB();

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('hello world');
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server running at port', 5000);
});