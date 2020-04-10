const {create} = require('../controllers/userContollers')

const router = require('express').Router()

router.post('/', create)

module.exports = router
