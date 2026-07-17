import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo' 

const app = express()

const dbString = process.env.STRING_CONNECTION
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connection = mongoose.createConnection(dbString)

app.use(express.json())
//to get data from html form
app.use(express.urlencoded({extended: true}))

const sessionStore = MongoStore.create({
    client: connection.getClient(),
    collection: 'session'
})

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // equals 1 day
    }
}))

app.get('/', (req, res, next) => {
    if(req.session.viewCount){
        req.session.viewCount++
    }else{
        req.session.viewCount = 1
    }
    res.send(`<h1>You have visited this page: ${req.session.viewCount} times</h1>`)
})

app.listen(3000)