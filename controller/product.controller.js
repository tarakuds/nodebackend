const slugify = require('slugify')
const Product = require('../models/products')
//const createProductSchema = require('../models/product.joi')

const getAllProducts = async (req,res)=>{
    try {
        const product = await Product.find()
        res.status(200).json({status:'success', data:product})
    } catch (error) {
        res.status(400).json({status:'failed', message:error})
    }
}

const createProducts = async(req,res)=>{
    try {
        const data = req.body 
        await createProductSchema.validateAsync(data, {abortEarly:false})
        data.slug=slugify(data.name, {lower:true})
        const product = await Product.create(data)
      
        res.status(200).json({status:'success', data:product})
    } catch (error) {
        if(error._original){
            res.status(400).json({status:'failed', message:error.details.map((item)=>item.message)}
            )
            return
        }
        if(error.code== '11000'){
            res.status(400).json({status:'error', message:'product already exists'})

        }
        
    }
}
const updateProduct = async(req,res)=>{
    try {
        const {slug}= req.params
        const product = await Product.findOneAndDelete({slug})

        if(!product){
            res.status(404).json({status:'error', message:'Product to be deleted not found'})
            return
        }

        res.status(200).json({status:'success', data:product})
    } catch (error) {
        res.status(400).json({status:'error', message:error})        
    }
}
const deleteProduct = async(req,res)=>{
    try {
        const {slug}= req.params
        const product = await Product.findOneAndDelete({slug})

        if(!product){
            res.status(404).json({status:'error', message:'Product to be deleted not found'})
            return
        }

        res.status(200).json({status:'success', data:product})
    } catch (error) {
        res.status(400).json({status:'error', message:error})        
    }
}

const getProduct = async (req, res)=>{
    try {
        const{slug} = res.params
        console.log(slug)
        const product = await Product.findOne({slug})

        if(!product){
            res.status(404).json({status: 'error', message: 'product not found'})
        }
        res.status(200).json({status:'success', data:product})
    } catch (error) {
        res.status(400).json({status: 'error', message: error})

        
    }
}
module.exports = {getAllProducts, updateProduct, deleteProduct, getProduct}