const {writeFileSync} = require('fs')

for (let i = 0; i < 100000; i++){
    writeFileSync('./textsFiles/big.txt', `hello ${i}\n`, {flag: 'a'})
}

console.log("created the file")