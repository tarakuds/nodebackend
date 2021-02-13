const router = require('express').Router()
const{ registerUser, loginUser} = require('../controller/user.controller')

router
.route('/registration')
.post(registerUser)

router
.route('/login')
.get(loginUser)

module.exports = router