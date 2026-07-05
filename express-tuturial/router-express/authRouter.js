const router = require('express').Router()
let { people, products } = require('../../data')

router.post('/', (req, res) => {
    const name = req.body.name
    if(!name){
        return res.status(400).json({success: false, message: "Insert a value"})
    }
    const lastId = people[people.length - 1].id
    const toAdd = {id: lastId + 1, name: name}
    people.push(toAdd)
    res.status(201).json({success: true, person: name})
})

module.exports = router