const express = require('express')
const app = express();
const login = require('./routes/signin')

app.use(express.json())
app.use('/server', login)

app.get('/', (req, res)=>{
    res.send('hello world');
})

app.listen(5000, () => {
    console.log('Server running at port', 5000);
});