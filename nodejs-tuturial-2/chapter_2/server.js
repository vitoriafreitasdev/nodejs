// The address of this server connected to the network is: 
// URL -> http://localhost:8383
// IP -> 127.0.0.1:8383
const express = require('express')
const app = express()
const PORT = 8383

let data = ["James"]


app.use(express.json())

// ENDPOINT - HTTP VERBS (method) && Routes (or paths)
// The method informs the nature of request and the route is a further subdirectory 
// (basically we direct the request to the body of code to respond appropriately, 
// and these locations or routes are called endpoints)

//Website endpoints => are for sending back html when a user enters a url in a browser
app.get('/', (req, res) => {
    console.log('User requested the home page website')
    res.send(`
        <body style="background:pink;color: blue;">
        <h1>DATA:</h1>
            <p>${JSON.stringify(data)}</p>
            <a href="/dashboard">Dashboard</a>
        </body>
        <script>console.log('This is my script')</script>
        `)
})

app.get('/dashboard', (req, res) => {
    res.send(`
        <body>
        <h1>dashboard</h1>
        <a href="/">home</a>
        </body>
        `)
})
//API endpoints => for returning data for client side, like a user login
app.get('/api/data', (req, res) => {
   res.status(201).send(data)
})
app.post('/api/data', (req, res) => {
    const newEntry = req.body
    data.push(newEntry.name)
    console.log(data)
    res.sendStatus(201)
})
app.delete('/api/endpoint', (req, res) => {
    console.log("Deleted element: ", data[data.length - 1])
    data.pop()
    console.log("Data: ", data)
    res.sendStatus(203)
})
app.listen(PORT, () => console.log(`Server has started on ${PORT}`))