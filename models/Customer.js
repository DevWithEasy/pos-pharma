const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    status : {
        type : String,
        emun : ['Basic', 'Silver', 'Gold', 'Daimond'],
        default : 'Basic'
    }
},{timestamps : true})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer