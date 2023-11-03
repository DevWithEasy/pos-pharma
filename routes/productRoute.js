const { createProduct,findGenericBrand, getProducts, updateProduct, deleteProduct, getProductsBySearch } = require('../controllers/productControllers')
const verifyToken = require('../utils/verifyToken')
const router = require('express').Router()

router.post('/create', verifyToken, createProduct)
      .put('/update/:id', verifyToken, updateProduct)
      .delete('/delete/:id', verifyToken, deleteProduct)
      .get('/findGenericBrand',findGenericBrand)
      .get('/',getProducts)
      .get('/search', getProductsBySearch)

module.exports = router