const {readFileSync, writeFileSync} = require('fs')

console.log('start')
const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')
//console.log(first, second)
//writeFileSync('./content/resultwithsync.txt', `Here is the result : ${first}, ${second}`)
//with flag, the result will append to the file
writeFileSync('./content/resultwithsync.txt', `Here is the result : ${first}, ${second}`, {flag: 'a'})
console.log('done with this task')
console.log('starting the next one')