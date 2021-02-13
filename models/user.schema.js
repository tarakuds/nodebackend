const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstname:{type:String, required:[true, 'firstname is required']},
    lastname:{type:String, required:[true, 'lastname is required']},
    email:{type:String, required:[true, 'Email is required'], unique:true},
    password:{type:String, required:[true, 'password is required']}
})
// const user = mongoose.model('user', userSchema)
// module.exports = user
 
module.exports = mongoose.model('user', userSchema)