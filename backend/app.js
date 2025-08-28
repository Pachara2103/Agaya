const express = require("express");
// const passport = require('passport');
// const session = require('express-session');

const app = express();
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

app.get('/', (req, res)=>{
    res.send('hello world');
})

//Route files
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const userRouter = require("./routes/user-routes");

//Mount routers
app.use("/api/v1/Agaya/", register);
app.use("/api/v1/Agaya/", login);
app.use("/api/v1/Agaya/", logout);
app.use("/api/v1/Agaya/users", userRouter);

//Import Passport strategies (Google, Facebook)
// require('./config/passport');

module.exports = app;
