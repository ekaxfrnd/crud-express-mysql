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
    }
}