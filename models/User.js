const conn = require('../config/db')

const User = function(user) {
    this.fullname = user.fullname
    this.email = user.email
    this.username = user.username
    this.password = user.password
}

User.create = (user, result) => {
    conn.query('INSERT INTO `users` SET ?', user, (err, res) => {
        if(err) {
            console.log(`error: ${err}`)
            result(err, null)
        }
        console.log('Create user: ', {...user})
        result(null, {...user})
    })
}

User.getAll = result => {
    conn.query('SELECT `fullname`, `username`, `email` FROM `users`', (err, res) => {
        if (err) {
            console.log(`error: ${err}`)
            result(null, err)
            return
        }
        console.log('Users: ', res)
        result(null, res);
    });
};

User.findById = (userId, result) => {
    conn.query('SELECT `fullname`, `username`, `email` FROM `users` WHERE `id` = ?', userId, (err, res) => {
        if(err) {
            console.log(`error: ${err}`)
            result(err, null)
            return
        }
        if(res.length) {
            console.log('Found User: ', res[0])
            result(null, res[0])
            return
        }
        result({kind: 'not_found'}, null)
    })
}

User.updateById = (userId, user, result) => {
    const {fullname, username, email, password} = user
    const sql = 'UPDATE `users` SET `fullname` = ?, `username` = ?, `email` = ?, `password` = ? WHERE `id` = ?'
    conn.query(sql, [fullname, username, email, password, userId], (err, res) => {
        if(err) {
            console.log(`error: ${err}`)
            result(null, err)
            return
        }
        if(res.affectedRows == 0) {
            result({kind: 'not_found'}, null)
            return
        }
        console.log('Updated User: ', {id: userId, ...user })
        result(null, {id: userId, ...user})
    })
}

User.remove = (userId, result) => {
    conn.query('DELETE FROM `users` WHERE `id` = ?', userId, (err, res) => {
        if(err) {
            console.log(`error: ${err}`)
            return(null, err)
            return
        }
        if(res.affectedRows == 0) {
            result({kind: 'not_found'}, null)
            return
        }
        console.log(`Deleted User with id ${userId}`)
        result(null, res)
    })
}

module.exports = User