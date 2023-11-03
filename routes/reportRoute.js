const { generateReport, createReport, getAllReport, deleteReport } = require('../controllers/reportControllers')
const verifyToken = require('../utils/verifyToken')
const router = require('express').Router()

router.post('/', verifyToken, generateReport)
      .post('/create', verifyToken,createReport)
      .get('/',verifyToken,getAllReport)
      .delete('/delete/:id',verifyToken,deleteReport)

module.exports = router