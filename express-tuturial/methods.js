const express = require('express')
const app = express()

let { people, products } = require('../data.js')

app.use(express.static('./express-tuturial/methods-public'))
//to read json data that it is passed through the request
app.use(express.json())

app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people})
})

app.post('/login', (req, res) => {
    const name = req.body.name
    if(!name){
        return res.status(400).json({success: false, message: "Insert a value"})
    }
    const lastId = people[people.length - 1].id
    const toAdd = {id: lastId + 1, name: name}
    people.push(toAdd)
    res.status(201).json({success: true, person: name})
})

app.post('/api/people/post', (req, res) => {
    const {name} = req.body 
    if(!name){
        return res.status(400).json({success: false, message: "Insert a value"})
    }
    const lastId = people[people.length - 1].id
    const toAdd = {id: lastId + 1, name: name}
    res.status(201).json({success: true, data: [...people, toAdd]})

})

app.put('/api/people/:id', (req, res) => {
    const {id} = req.params
    const {name} = req.body

    const personFind = people.find((p) => Number(id) === p.id)

    if(!personFind) return res.status(404).json({success: false, message: "Person not Found"})

    personFind.name = name
    
    // Tuturial solution:
    // const newPeople = people.map((person) => {
    //     if(person.id === Number(id)) {
    //         person.name = name 
    //     }
    //     return person
    // })

    res.status(201).json({success: true, data: people})

})

app.delete('/api/people/:id', (req, res) => {
    const {id} = req.params

    const personFind = people.find((p) => Number(id) === p.id)

    if(!personFind) return res.status(404).json({success: false, message: "Person not Found"})

    const filter = people.filter((p) => Number(id) !== p.id)

    people = filter

    res.status(201).json({success: true, data: people})
})

app.listen(5000, () => {
    console.log("Server connect")
})