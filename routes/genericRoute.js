const { hello, createGeneric, updateGeneric, deleteGeneric, getAllGeneric } = require('../controllers/genericControllers')
const verifyToken = require('../utils/verifyToken')
const router = require('express').Router()

router.post('/create', verifyToken, createGeneric)
router.put('/update/:id', verifyToken, updateGeneric)
router.delete('/delete/:id', verifyToken, deleteGeneric)
router.get('/', getAllGeneric)

module.exports = router