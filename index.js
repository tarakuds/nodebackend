const express = require('express')
const mongoose = require('mongoose')
// const Product = require('./models/products')
// const userRoute = require('./views/user.route')
const port = process.env.PORT || 8080
//const port = 8080
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

// app.use('/user', userRoute)
// app.use('/product', product)

app.get('/', (req,res)=>{
    res.send("<h1>This is the Homepage</h1>")
})
// app.get('/products', async(req,res)=>{
//     try {
//      const product = await Product.find()
//      //const product = await Product.find({cat:'bag'})
//      res.send(product)
//     } catch (err) {
//         res.send("there is an error")
        
//     }
//  })
// app.post('/products', async(req,res)=>{
//    try {
//     const data = req.body
//     const newProduct = await Product.create (data)
//     res.send(newProduct)
//     console.log(newProduct)       
//    } catch (error) {
//        res.send(error.message)
//    }
// })
 //database values here 
mongoose.connect('mongodb+srv://user:Jrl4jisNlIwOngU3@estore.qzl75.mongodb.net/taraStore?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
    }).then(()=>{
    console.log('db connected')
    app.listen(port, ()=>{
        console.log("port 8080 has been opened")
    })
    
})


app.use((req,res)=>{
    res.send('<h1>This is an error page</h1>')
})
