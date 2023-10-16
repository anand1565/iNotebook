const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();
const port = 8085;
app.get('/',(req,res) =>{
    res.send("hello Anand")
})

app.get('/login', (req, res) => {
    res.send("hello this is the login page")
})

app.get('/signup', (req, res) => {
    res.send("hello this is the signup page")
})

app.listen(port, () =>{
    console.log(`App listening at http://localhost:${port}`)
})