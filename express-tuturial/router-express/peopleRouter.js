const express = require('express')
const router = express.Router()

const peopleController = require('../controller/people')

// router.get('/',peopleController.getPeople)
// router.post('/post',peopleController.postPerson)
// router.put('/:id', peopleController.putPerson)
// router.delete('/:id', peopleController.delPerson)

router.route('/').get(peopleController.getPeople)
router.route('/post').post(peopleController.postPerson)
router.route('/:id').put(peopleController.getPeople).delete(peopleController.delPerson)

module.exports = router