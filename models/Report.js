const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    year : {
        type : String,
        required : true
    },
    month : {
        type : String,
        required : true
    }, 
    purchase : {
        type : Number,
        required : true
    },
    sale : {
        type : Number,
        required : true
    }

},{timestamps : true})

const Report = mongoose.model('Report', reportSchema)

module.exports = Report