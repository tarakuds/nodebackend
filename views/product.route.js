const router = require('express').Router()
const { getAllProducts, getProduct,updateProduct,deleteProduct} = require('../controller/product.controller')

router.route('/').get(getAllProducts)

router.route('/:slug').get(getProduct).patch(updateProduct).delete(deleteProduct)

module.exports = router