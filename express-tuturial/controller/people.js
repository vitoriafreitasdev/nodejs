let { people, products } = require('../../data')


const peopleController = {
    getPeople: (req, res) => {
        res.status(200).json({sucess: true, data: people})
    },
    postPerson: (req, res) => {
        const {name} = req.body 
        if(!name){
            return res.status(400).json({success: false, message: "Insert a value"})
        }
        const lastId = people[people.length - 1].id
        const toAdd = {id: lastId + 1, name: name}
        res.status(201).json({success: true, data: [...people, toAdd]})
    },
    putPerson: (req, res) =>  {
        const {id} = req.params
        const {name} = req.body

        const personFind = people.find((p) => Number(id) === p.id)

        if(!personFind) return res.status(404).json({success: false, message: "Person not Found"})

        personFind.name = name
        
        res.status(201).json({success: true, data: people})
    },
    delPerson: (req, res) => {
        const {id} = req.params

        const personFind = people.find((p) => Number(id) === p.id)

        if(!personFind) return res.status(404).json({success: false, message: "Person not Found"})

        const filter = people.filter((p) => Number(id) !== p.id)

        people = filter

        res.status(201).json({success: true, data: people})
    }
}

module.exports = peopleController