const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
// config({
//     path:'./config/config.env'
// })
const app = express()
app.use(cors())
const router = express.Router()
const Product = require('./views/product.route')
const userRoute = require('./views/user.route')
const PORT = process.env.PORT || 5000
app.use(express.json())
// app.get('/', (req, res)=>{
//     res.send('the home page')
// })
app.use('/user', userRoute)
app.use('/product', Product)


mongoose.connect('mongodb+srv://user:Jrl4jisNlIwOngU3@estore.qzl75.mongodb.net/taraStore?retryWrites=true&w=majority', {
// mongoose.connect(process.env.mongoURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
    }).then(()=>{
    console.log('db connected')
    app.listen(PORT, ()=>{
        console.log(`Listening at ${PORT} =:) HELLO WORLD`)
    })
    
})