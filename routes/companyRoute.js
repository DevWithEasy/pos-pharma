const {getAllCompany, createCompany, updateCompany, deleteCompany } = require('../controllers/companyControllers')
const verifyToken = require('../utils/verifyToken')
const router = require('express').Router()

router.post('/create', verifyToken, createCompany)
router.put('/update/:id', verifyToken, updateCompany)
router.delete('/delete/:id', verifyToken, deleteCompany)
router.get('/', getAllCompany)

module.exports = router