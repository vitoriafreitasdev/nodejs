const express = require('express')
const router = express.Router()

const {getPeople, postPerson, putPerson, delPerson}= require('../controller/people')

// router.get('/',getPeople)
// router.post('/post',postPerson)
// router.put('/:id', putPerson)
// router.delete('/:id', delPerson)

router.route('/').get(getPeople)
router.route('/post').post(postPerson)
router.route('/:id').put(getPeople).delete(delPerson)

module.exports = router