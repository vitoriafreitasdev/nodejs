const express = require('express')
const { products } = require('../data.js')
const app = express()

const logger = require('../functions/logger.js')

//app.use(logger) // here he will be applied in all of the routes
//can have a path in use:
app.use('/api',logger) // here the middleware gonna only be applied to the routes that have '/api'

//Examples of paths with app.use()
/* 
//Matches the exact path /abcd and any sub-paths starting with /abcd/ (for example, /abcd/foo):
app.use('/abcd', (req, res, next) => {
  next();
});

//This will match paths starting with /abcd and /abd:
app.use('/ab{c}d', (req, res, next) => {
  next();
});

//This will match paths starting with /abc and /xyz:
app.use(/\/abc|\/xyz/, (req, res, next) => {
  next();
});

//This will match paths starting with /abcd, /xyza, /lmn, and /pqr:
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], (req, res, next) => {
  next();
});

*/

app.get('/', (req,res) => {
    res.send('Home Page')
})

app.get('/about', (req,res) => {
    res.send('About Page')
})

app.get('/api/products', (req,res) => {
    res.send('Products Page')
})

app.get('/api/items', (req,res) => {
    res.send('Items Page')
})

app.listen(5000, () => console.log("Server is On"))