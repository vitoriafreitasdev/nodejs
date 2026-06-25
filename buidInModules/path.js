
//PATH
const path = require('path')
console.log(path.sep)
const filePath = path.join('/content', 'subfolder', 'test.txt')
console.log(filePath)
const base = path.basename(filePath)
console.log(base)



const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(absolute)
console.log(path.resolve(__dirname, __filename))

const res = path.resolve
console.log(res(__dirname, 'content', 'subfolder', 'test.txt'))