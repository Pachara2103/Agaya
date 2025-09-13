const express = require("express");
const passport = require('passport');
const session = require('express-session');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(express.json());

//Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

//Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

//Route files
const userRouter = require("./routes/user-routes");
const authRouter = require("./routes/auth-routes");

//Mount routers
app.use("/api/v1/Agaya/auth", authRouter);  
app.use("/api/v1/Agaya/users", userRouter);

//Import Passport strategies (Google)
require('./config/passport');

module.exports = app;
