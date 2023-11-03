const {  findCustomer, updateUser, deleteUser, getAllCustomer, createCustomer } = require('../controllers/customerControllers')
const verifyToken = require('../utils/verifyToken')
const router = require('express').Router()

router.post('/create', verifyToken, createCustomer)
      .put('/update/:id', verifyToken, updateUser)
      .delete('/delete/:id', verifyToken, deleteUser)
      .get('/:phone', verifyToken, findCustomer)
      .get('/', getAllCustomer)

module.exports = router