const express = require('express')
const { products } = require('../data.js')
const app = express()

//Middleware in express
/* 
Middleware are functions that execute during the request to the server, 
having access to request and response objects
-- req => middleware => res --
*/

const midddlewareLogger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next()
}

app.get('/', midddlewareLogger, (req,res) => {
    res.send('Home Page')
})

app.get('/about', midddlewareLogger, (req,res) => {
    res.send('About Page')
})

app.listen(5000, () => console.log("Server is On"))