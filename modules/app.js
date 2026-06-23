const {james, mariah, michael} = require('./name')
const greeting = require('./greeting')
const meeting = require('./meeting')

meeting(greeting, james)
meeting(greeting, mariah)
meeting(greeting, michael)
