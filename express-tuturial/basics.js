const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log("User requested the home page")
    res.status(200).send('Home Page')
})
app.get('/about', (req, res) => {
    console.log("User requested the about page")
    res.status(200).send('About Page')
})

app.all("/*path", (req, res) => {
  res.status(404).send('Page not found')
})

app.listen(5000, () => {
    console.log("Server ON: Port 5000 ")
})

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen