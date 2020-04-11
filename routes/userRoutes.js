const {create, findAll, findOne} = require('../controllers/userContollers')

const router = require('express').Router()

router.post('/', create)
router.get('/', findAll)
router.get('/:userId', findOne)

module.exports = router
