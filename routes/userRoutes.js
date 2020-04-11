const {create, findAll} = require('../controllers/userContollers')

const router = require('express').Router()

router.post('/', create)
router.get('/', findAll)

module.exports = router
