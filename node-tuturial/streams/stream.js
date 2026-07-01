/* 
 streams

-Writeable
-Readable
-Duplex
-Transform
*/
const {createReadStream} = require('fs')

//const stream = createReadStream('./textsFiles/big.txt')
//const stream = createReadStream('./textsFiles/big.txt', {encoding: 'utf-8'})

//control the size of buffer (default: 64kb) with highWaterMark (the value that we are passing is in bytes)
//const stream = createReadStream('./textsFiles/big.txt', {highWaterMark: 9000})

const stream = createReadStream('./textsFiles/big.txt', {highWaterMark: 9000, encoding: 'utf-8'})

stream.on('data', (result) => {
    console.log(result)
})

stream.on('data', (result) => {
    console.log(result)
})
stream.on('error', (err) => console.log(err))