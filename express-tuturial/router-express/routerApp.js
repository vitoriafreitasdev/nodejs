const express = require('express')
const people = require('./peopleRouter')
const auth = require('./authRouter')
const app = express()

app.use(express.static('./express-tuturial/methods-public'))
//to read json data that it is passed through the request
app.use(express.json())
//router to people
app.use("/api/people", people)
//router to auth
app.use("/login", auth)

app.listen(5000, () => {
    console.log("Server connect")
})