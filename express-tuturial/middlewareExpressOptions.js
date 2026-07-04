const express = require('express')
const { products } = require('../data.js')
const app = express()

const logger = require('../functions/logger.js')
const authorize = require('../functions/authorize.js')

//middleware options
//1. middleware in app
//app.use([authorize, logger]) // will be executed in the order // if the url do not have ?user=john, will be unauthorized 

//others: our own | express | third party
//express example:
// app.use(express.static('./public'))
// third party:
/*const logger = require('morgan'); // need to add pnpm add morgan
app.use(logger('dev'));*/

app.get('/', (req,res) => {
    res.send('Home Page')
})

app.get('/about', (req,res) => {
    res.send('About Page')
})

app.get('/api/products', (req,res) => {
    res.send('Products Page')
})

//2.in the route
app.get('/api/items', [authorize, logger],(req,res) => {
    console.log(req.user) // passed through the middleware { name: 'john', id: 3 }
    res.send('Items Page')
})

app.listen(5000, () => console.log("Server On"))