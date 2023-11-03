const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    customer : {
        type : mongoose.Types.ObjectId,
        ref : 'Customer'
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    total : {
        type : Number,
        required : true
    },
    discount : {
        type : Number,
        required : true
    },
    paid : {
        type : Number,
        required : true
    },
    products : {
        type : Array,
        required : true
    },
    
},{timestamps : true})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice