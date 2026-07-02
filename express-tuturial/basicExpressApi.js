const express = require('express')
const { products } = require('../data.js')
const app = express()

app.get('/', (req,res) => {
    res.send('<h1> Home Page </h1><a href="/api/products">products</a>')
})

app.get('/api/products', (req,res) => {
    const newP = products.map((p) => {
        const {id, name, image} = p 
        return {id, name, image}
    })
    res.json(newP)
})

app.get('/api/products/:productID', (req,res) => {
    //filter return a array with the product, find return one object
    const {productID} = req.params
    //const pFind = products.filter((p) => p.id === Number(productID))
    const pFind = products.find((p) => p.id === Number(productID))
    if(!pFind) return res.status(404).send('Product Does Not Exist')
    return res.json(pFind)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    res.send("ok")
})

app.get('/api/v1/query', (req, res) => {
    //search example: http://localhost:5000/api/v1/query?name=john&id=4
    //search example: http://localhost:5000/api/v1/query?search=a&limit=4
    //console.log(req.query) ////[Object: null prototype] { name: 'john', id: '4' } | [Object: null prototype] { search: 'a', limit: '4' }
    const {search, limit} = req.query
    let sortedProducts = [...products]
    if(search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if(sortedProducts.length < 1) {
        //return res.status(200).send('No products find')
        return res.status(200).json({success: true, data:[]})
    }
    res.status(200).json(sortedProducts)
})

//using in the same route as /api/products
// app.get('/api/products', (req,res) => {
//     //http://localhost:5000/api/products?search=a&limit=4
//     const {search, limit} = req.query
//     let sortedProducts = [...products]
//     if(search) {
//         sortedProducts = sortedProducts.filter((product) => {
//             return product.name.startsWith(search)
//         })
//     }
//     if(limit){
//         sortedProducts = sortedProducts.slice(0, Number(limit))
//     }
//     if(sortedProducts.length < 1) {
//         //return res.status(200).send('No products find')
//         return res.status(200).json({success: true, data:[]})
//     }
//     res.status(200).json(sortedProducts)
// })

app.listen(5000, () => console.log("Server is On"))