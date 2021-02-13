const user = require('../models/user.schema')
const bcrypt = require('bcryptjs')
const {registrationSchema, loginSchema} = require('../models/user.joi')

const registerUser = async (req, res)=>{
    try {
        const data = req.body
        await registrationSchema.validateAsync(data, {abortEarly:false})
        // data.firstname = data.firstname.toLowerCase()
        // data.lastname = data.lastname.toLowerCase()
        data.email = data.email.toLowerCase()
        data.password = await bcrypt.hash(data.password, 8)
        
        const user = await user.create(data)
        res.status(201).json({status:'successful', data: user})
        //Sres.send('registration page')
         
    } catch (error) {
        if(error._original){
            res.status(400).json({status:'failed', message: error.details.map((item)=>item.message)
        })
        return
        }
        if(error.code === 11000){
            res.sttatus(400).json({status:'failed', message: 'user already exists'})
        return
        }
        res.status(400).json({status:'failed','message': error})
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