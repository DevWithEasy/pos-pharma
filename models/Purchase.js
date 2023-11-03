const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    total : {
        type : Number,
        required : true
    }, 
    products : {
        type : Array,
        default : []
    }

},{timestamps : true})

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase