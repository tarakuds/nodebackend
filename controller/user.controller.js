const user = require('../models/user.schema')
const bcrypt = require('bcryptjs')
const {registrationSchema, loginSchema} = require('../models/user.joi')

const registerUser = async (req, res)=>{
    try {
        const data = req.body
        data.firstname = data.firstname.toLowerCase()
        data.lastname = data.lastname.toLowerCase()
        data.email = data.email.toLowerCase()
        data.password = await bcrypt.hash(data.password, 8)
        await registrationSchema.validateAsync(data, {abortEarly:false})
        const user = await user.create(data)
        res.status(201).json()
        res.send('registration page')
         
    } catch (error) {
        res.status(400).json({'message': error})
    }
}

const loginUser = async (req, res)=>{
    try {
        const data = req.body
        await registrationSchema.validateAsync(data, {abortEarly:false})
        data.email = data.email.toLowerCase()
        data.password = await bcrypt.hash(data.password, 8)
        const user = await user.find(data)
        res.status(201).json()
         
    } catch (error) {
        res.status(400).json({'message': error})
    }
}

module.exports = {registerUser, loginUser}