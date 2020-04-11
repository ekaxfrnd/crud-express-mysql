const {create, findAll, findOne, updateId, deleteId} = require('../controllers/userContollers')

const router = require('express').Router()

router.post('/', create)
router.get('/', findAll)
router.get('/:userId', findOne)
router.put('/:userId', updateId)
router.delete('/:userId', deleteId)

module.exports = router
