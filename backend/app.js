const express = require("express");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const errorHandler = require('./middleware/errorHandler');
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

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
const addressRouter = require("./routes/address-routes");
const authRouter = require("./routes/auth-routes");
const productRouter = require("./routes/product-routes");
const categoryRouter = require("./routes/category-routes");
const otpRoutes = require('./routes/otp-routes');
const vendorAppRoutes = require('./routes/vendor-application-routes');
const adminRoutes = require('./routes/admin-routes');
const orderRoutes = require('./routes/order-routes')
const uploadRoutes = require('./routes/upload-routes');
const addToRoutes = require('./routes/addto-routes');
const cartRoutes = require('./routes/cart-routes');
const returnRoutes = require('./routes/return-request-routes');
const containRoutes = require('./routes/contain-routes');
const supportTicketRoutes = require('./routes/support-ticket-routes');
const reviewRoutes = require("./routes/review-routes");
const transactionRoutes = require('./routes/transaction-routes');
const reviewReportRoutes = require('./routes/review-report-routes');
const paymentRoutes = require('./routes/payment-routes');

//Mount upload route
app.use('/api/v1/Agaya/upload', uploadRoutes);

//Mount routers
app.use("/api/v1/Agaya/auth", authRouter);  
app.use("/api/v1/Agaya/users", userRouter);
app.use("/api/v1/Agaya/address", addressRouter);
app.use("/api/v1/Agaya/products", productRouter);
app.use("/api/v1/Agaya/category", categoryRouter);
app.use('/api/v1/Agaya/otp', otpRoutes);
app.use('/api/v1/Agaya/vendor-applications', vendorAppRoutes);
app.use('/api/v1/Agaya/admin', adminRoutes);
app.use('/api/v1/Agaya/orders', orderRoutes);
app.use('/api/v1/Agaya/transactions', transactionRoutes);
app.use('/api/v1/Agaya/addto', addToRoutes);
app.use('/api/v1/Agaya/cart', cartRoutes);
app.use('/api/v1/Agaya/return', returnRoutes);
app.use('/api/v1/Agaya/addto', addToRoutes);
app.use('/api/v1/Agaya/cart', cartRoutes);
app.use('/api/v1/Agaya/contain', containRoutes);
app.use('/api/v1/Agaya/support-ticket', supportTicketRoutes);
app.use('/api/v1/Agaya/reviews', reviewRoutes);
app.use('/api/v1/Agaya/review-reports', reviewReportRoutes);
app.use('/api/v1/Agaya/payment', paymentRoutes);

//Import Passport strategies (Google)
require('./config/passport');

app.use(errorHandler);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'Agaya selling platform'
        },
        servers: [
            {
                url: "http://localhost:5000/api/v1/Agaya"
            }
        ],
    },
    apis:['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;
