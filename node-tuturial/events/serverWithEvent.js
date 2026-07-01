const http = require('http')
//http herda do EventEmitter, por isso tem o metodo on
const server = http.createServer()

server.on('request', (req, res) => {
    res.end('Heyyy')
})


server.listen(5000, () => console.log("Server on"))