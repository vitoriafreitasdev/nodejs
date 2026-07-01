const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('response', (name, id) => {
    console.log(`data recieved: ${name} - ${id}`)
})

customEmitter.on('response', () => {
    console.log('some other logic')
})

customEmitter.on('other', (data) => {
    console.log(data)
})

customEmitter.emit('response', 'john', 34)
customEmitter.emit('other', 'testing things')
