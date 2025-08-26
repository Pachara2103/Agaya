const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user-routes");

const app = express();
app.use(cors());
app.use(express.json());


//Route files
const register = require('./routes/register');
const signin = require('./routes/login');
const userRouter = require("./routes/user-routes");

//Mount routers
app.use("/api/v1/Agaya/users", userRouter);
app.use("/api/v1/Agaya/register", register);
app.use("/api/v1/Agaya/signin", signin);

module.exports = app;
