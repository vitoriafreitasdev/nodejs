const {readFile, writeFile} = require('fs').promises
// const util = require('util')
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)

const writeText = async (path1, path2) => {
    // const res1 = await readFilePromise(path1, 'utf-8')
    // const res2 = await readFilePromise(path2, 'utf-8')
    const res1 = await readFile(path1, 'utf-8')
    const res2 = await readFile(path2, 'utf-8')
    // await writeFilePromise('resultwithsync2.txt', `new result: ${res1}, ${res2}`)

    await writeFile('./textsFiles/resultwithsync2.txt', ` test ${res1}, ${res2}`, {flag: 'a'})
    console.log("File written")
}

writeText('./textsFiles/first.txt', './textsFiles/second.txt')