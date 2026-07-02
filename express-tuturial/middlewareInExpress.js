const express = require('express')
const { products } = require('../data.js')
const app = express()

//Middleware in express
/* 
Middleware are functions that execute during the request to the server, 
having access to request and response objects
-- req => middleware => res --
*/

app.get('/', (req,res) => {
    res.send('Home Page')
})

app.listen(5000, () => console.log("Server is On"))