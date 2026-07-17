import express from 'express'

const app = express()

function middlewareFunction(req, res, next){
    //req.message = "Heyy i am a middleware"
    //const errObj = new Error('I am an error')
    req.customProperty = 100
    next()
}

function middlewareFunction2(req, res, next){
    console.log(`Value: ${req.customProperty} `)
    req.customProperty = 600
    
    next()
}

function middlewareFunction3(req, res, next){
    console.log("Heyy i am a middleware 3")
    next()
}

function errorHandler(err, req, res, next){
    if(err){
        return res.send("<h1> There was an error, please try again</h1>")
    }
}

function expressCallback(requestObject, responseObject, nextMiddleware){
    //console.log(requestObject.message)
    responseObject.send(`<h1>The value that came from the middlewares is: ${requestObject.customProperty}</h1>`)
}

app.use(middlewareFunction)
app.use(middlewareFunction2)

app.get('/', middlewareFunction3, expressCallback)

//need to be in
app.use(errorHandler)

app.listen(3000, () => {console.log("Server is on port 3000.")})