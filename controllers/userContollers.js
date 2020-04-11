const User = require('../models/User')

module.exports = {
    create: (req, res) => {
        if(!req.body) {
            res.status(400).send({
                message: `Content can't be empty`
            })
        }
        const user = new User(req.body)
        User.create(user, (err, data) => {
            if(err) {
                res.status(500).send({
                    message: 'Some error occured while creating the User'
                })
            } else {
                res.send(data)
            }
        })
    },
    findAll: (req, res) => {
        User.getAll((err, data) => {
            if(err) {
                res.status(500).send({
                    message: 'Some error occured while retrieving users'
                })
            } else {
                res.send(data)
            }
        })
    },
    findOne: (req, res) => {
        User.findById(req.params.userId, (err, data) => {
            if(err) {
                if(err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.userId}`
                    })
                } else {
                    res.status(500).send({
                        message: `Error retrieving User with id ${req.params.userId}`
                    })
                }
            } else {
                res.send(data)
            }
        })
    }
}