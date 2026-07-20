//const {readFile} = require('fs')
import { readFile } from 'fs'
console.log("Started a first task")

readFile('first.txt', 'utf-8', (err, result) => {
    if(err) {
        console.log(err)
        return
    }
    console.log(result)
    console.log("completed first task")
})

console.log('starting next task')

readFile('second.txt', 'utf-8', (err, result) => {
    if(err) {
        console.log(err)
        return
    }
    console.log(result)
    console.log("completed second task")
})

for(let i = 0; i < 3; i++){
    console.log(i)
}

console.log('finish program')
