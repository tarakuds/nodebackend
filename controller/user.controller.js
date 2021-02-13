const User = require('../models/user.schema')
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
        
        const user = await User.create(data)
        res.status(201).json({status:'successful', data: user})
        //Sres.send('registration page')
         
    } catch (error) {
        if(error._original){
            res.status(400).json({status:'failed', message: error.details.map((item)=>item.message)
        })
        return
        }
        if(error.code === 11000){
            res.status(400).json({status:'failed', message: 'user already exists'})
        return
        }
        console.log(error)
        res.status(400).json({status:'not good', message: error})
    }
}

const loginUser = async (req, res)=>{
    try {
        const data = req.body
        await loginSchema.validateAsync(data, {abortEarly:false})
        data.email = data.email.toLowerCase()
        const user = await User.findOne({email: data.email})
      if(!user){
        res.status(400).json({status:'error', message:'user doesnt exist'})
        return
      }
      const checkPassword = await bcrypt.compare(data.password, user.password)
      if(!checkPassword){
        res.status(400).json({status:'error', message:'password incorrect'})
        return
      }
        res.status(201).json({status:'success', data:user})
         
    } catch (error) {
        res.status(400).json({'message': error})
    }
}

module.exports = {registerUser, loginUser}