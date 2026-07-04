
const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(`Request method: ${method} | Url: ${url} | Time: ${time}`)
    next()
}

module.exports = logger