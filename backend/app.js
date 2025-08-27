const express = require("express");
// const passport = require('passport');
// const session = require('express-session');
const cors = require("cors");
const userRouter = require("./routes/user-routes");

const app = express();
app.use(cors());
app.use(express.json());

//Session middleware
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true
// }));

//Passport.js middleware
// app.use(passport.initialize());
// app.use(passport.session());


//Route files
const register = require('./routes/register');
const login = require('./routes/login');
const userRouter = require("./routes/user-routes");

//Mount routers
app.use("/api/v1/Agaya/users", userRouter);
app.use("/api/v1/Agaya/", register);
app.use("/api/v1/Agaya/", login);

//Import Passport strategies (Google, Facebook)
// require('./config/passport');

module.exports = app;
