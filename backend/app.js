const express = require("express");
const userRouter = require("./routes/user-routes");

const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('hello world');
})

app.use("/api/v1/Agaya/users", userRouter);

module.exports = app;
