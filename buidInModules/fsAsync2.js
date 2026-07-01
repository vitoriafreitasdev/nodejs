const {readFile, writeFile} = require('fs')

const getText = (path) => {
    const pathFind = new Promise((resolve, reject) => {
        readFile(path, 'utf-8', (err, data) => {
            if(err){
                reject(err) 
            } else{
                resolve(data)
            }
        })
    })

    return pathFind
}

const writeText = async (path1, path2) => {
    const res1 = await getText(path1)
    const res2 = await getText(path2)
    writeFile('./textsFiles/resultwithsync2.txt', `Here is the result of the fsAsync2 enhanced: ${res1}, ${res2}`, (err, res) => {
        if(err){
            console.log(err)
            return 
        }   
        console.log('done with this task')
    })
}

writeText('./textsFiles/first.txt', './textsFiles/second.txt')