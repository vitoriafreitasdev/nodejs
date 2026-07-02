const express = require('express')
const path = require('path')
const app = express()

// setup static and middleware
app.use(express.static('./public'))

// app.get('/', (req, res) => {
//     //absolute path
//     res.sendFile(path.resolve(__dirname, './nav-bar/index.html'))
////   Forms to show dinamic pages 
////   adding to static assets
////   SSR
// })

app.all('/*path', (req, res) => {
    res.status(404).send("Page Not Found")
})

app.listen(5000, () => {
    console.log("Server is listening on port: 5000")
})