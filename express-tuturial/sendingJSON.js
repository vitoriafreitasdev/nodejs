const express = require('express')
const { products } = require('../data.js')
const app = express()

app.get('/', (req,res) => {
    res.json(products)
})

app.listen(5000, () => console.log("Server On"))