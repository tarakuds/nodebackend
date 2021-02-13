const joi = require('joi')

const registrationSchema = joi.object({
    firstname: joi.string().min(4).max(15).required(),
    lastname: joi.string().min(4).max(15).required(),
    email: joi.string().min(4).max(30).required(),
    password: joi.string().min(4).max(15).required(),

})

const loginSchema = joi.object({
    email: joi.string().min(4).max(30).required(),
    password: joi.string().min(4).max(15).required(),

})

module.exports = {registrationSchema, loginSchema}