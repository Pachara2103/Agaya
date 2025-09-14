const express = require("express");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const errorHandler = require('./middleware/errorHandler');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(errorHandler);

//Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

//Route files
const userRouter = require("./routes/user-routes");
const authRouter = require("./routes/auth-routes");
<<<<<<< HEAD
const productRouter = require("./routes/product-routes");
||||||| 8833a62
=======
const productRouter = require("./routes/product-routes");
const categoryRouter = require("./routes/category-routes");
>>>>>>> 4fa6c6ae5a9c1c679bf58b642b15670b8e915504

//Mount routers
app.use("/api/v1/Agaya/auth", authRouter);  
app.use("/api/v1/Agaya/users", userRouter);
<<<<<<< HEAD
app.use("/api/v1/Agaya/products", productRouter);
||||||| 8833a62
=======
app.use("/api/v1/Agaya/products", productRouter);
app.use("/api/v1/Agaya/category", categoryRouter);
>>>>>>> 4fa6c6ae5a9c1c679bf58b642b15670b8e915504

//Import Passport strategies (Google)
require('./config/passport');

module.exports = app;
