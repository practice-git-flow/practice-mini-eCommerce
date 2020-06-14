const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {

    static register(req,res,next) {

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                if (err.errors) {
                    const err_data = err.errors.map(el => el.message)
                    next({ str_code: 'REGISTER_VALIDATION', err_data})
                } else {
                    next({ str_code: 'INTERNAL_SERVER_ERROR'})
                }
            })

    }
    
    static login(req,res,next) {
        const { email, password } = req.body

        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                if (data) {
                    if (bcrypt.compareSync(password, data.password)) {
                        let userData = {
                            id: data.id,
                            email: data.email,
                            name: data.name
                        }

                        const access_token = jwt.sign(userData, process.env.JWT_KEY)
                        userData.access_token = access_token
                        return res.status(200).json(userData)
                    } else {
                        next({ str_code: 'INCORRECT_PASSWORD'})
                    }
                } else {
                    next({ str_code: 'EMAIL_NOT_FOUND'})
                }
            })
            .catch(() => {
                    next({ str_code: 'INTERNAL_SERVER_ERROR'})
            })
    }

}

module.exports = UserController