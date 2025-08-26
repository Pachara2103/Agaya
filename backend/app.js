const express = require("express");

const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('hello world');
})

//Route files
const register = require('./routes/register');
const signin = require('./routes/login');
const userRouter = require("./routes/user-routes");

//Mount routers
app.use("/api/v1/Agaya/users", userRouter);
app.use("/api/v1/Agaya/register", register);
app.use("/api/v1/Agaya/signin", signin);

module.exports = app;
