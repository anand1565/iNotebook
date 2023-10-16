const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();
const port = 8085;
app.get('/',(req,res) =>{
    res.send("hello anand")
})

app.listen(port, () =>{
    console.log(`App listening at http://localhost:${port}`)
})