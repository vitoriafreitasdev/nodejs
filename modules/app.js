const {james, mariah, michael} = require('./name')
const greeting = require('./greeting')
const meeting = require('./meeting')
const data = require('./alternativeway')
require('./addValues')

console.log(data.singlePerson)
console.log(data.items)

meeting(greeting, james)
meeting(greeting, mariah)
meeting(greeting, michael)
