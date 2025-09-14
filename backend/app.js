const express = require("express");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const errorHandler = require('./middleware/errorHandler');
const cors = require("cors");

const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

//Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

//Route files
const userRouter = require("./routes/user-routes");
const authRouter = require("./routes/auth-routes");
const productRouter = require("./routes/product-routes");
const categoryRouter = require("./routes/category-routes");

//Mount routers
app.use("/api/v1/Agaya/auth", authRouter);  
app.use("/api/v1/Agaya/users", userRouter);
app.use("/api/v1/Agaya/products", productRouter);
app.use("/api/v1/Agaya/category", categoryRouter);

//Import Passport strategies (Google)
require('./config/passport');

app.use(errorHandler);

module.exports = app;
