const {createInvoice, getInvoices, getInvoice, deleteInvoice } = require('../controllers/invoiceControllers')
const verifyToken = require('../utils/verifyToken')
const router = require('express').Router()

router.post('/create',verifyToken,createInvoice)
      .get('/',verifyToken,getInvoices)
      .get('/:id',verifyToken,getInvoice)
      .delete('/delete/:id',verifyToken,deleteInvoice)

module.exports = router