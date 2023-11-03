const { createPurchase, getAllPurchase, deletePurchase } = require('../controllers/purchaseControllers')
const verifyToken = require('../utils/verifyToken')
const router = require('express').Router()

router.post('/create',verifyToken,createPurchase)
      .get('/', getAllPurchase)
      .delete('/delete/:id', deletePurchase)

module.exports = router