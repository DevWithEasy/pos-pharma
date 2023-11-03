const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    generic : {
        type : mongoose.Types.ObjectId,
        ref : 'Generic'
    },
    company : {
        type : mongoose.Types.ObjectId,
        ref : 'Company'
    },
    sku : {
        type : String,
        required : true
    },
    sku_unit : {
        type : String,
        enum : ['mg','ml'],
        required : true
    },
    type : {
        type : String,
        enum : ['Tablet','Capsule','Syrup','Suspension','Cream'],
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        default : 0
    }

},{timestamps : true})

const Product = mongoose.model('Product', productSchema)

module.exports = Product