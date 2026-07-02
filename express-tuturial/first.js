const http = require('http')
const {readFileSync} = require('fs')

const home = readFileSync('./express-tuturial/nav-bar/index.html')
const homeStyles = readFileSync('./express-tuturial/nav-bar/styles.css')
const homeImage = readFileSync('./express-tuturial/nav-bar/logo.svg')
const homeLogic = readFileSync('./express-tuturial/nav-bar/browser-app.js')

const server = http.createServer((req, res) => {
    const url = req.url
    if(url === '/'){
        res.writeHead(200, {'content-type': 'text/html'})
        res.write(home)
        res.end()
    }
    else if(url === '/about'){
        res.writeHead(200, {'content-type': 'text/html'})
        res.write(`<h1>About page</h1>`)
        res.end()
    }
    else if(url === '/styles.css'){
        res.writeHead(200, {'content-type': 'text/css'})
        res.write(homeStyles)
        res.end()
    }
    else if(url === '/logo.svg'){
        res.writeHead(200, {'content-type': 'image/svg+xml'})
        res.write(homeImage)
        res.end()
    }
    else if(url === '/browser-app.js'){
        res.writeHead(200, {'content-type': 'text/javascript'})
        res.write(homeLogic)
        res.end()
    }
    else {
        res.writeHead(404, {'content-type': 'text/html'})
        res.write(`<h1>Error page</h1>`)
        res.end()
    }
    
})
server.listen(5000)