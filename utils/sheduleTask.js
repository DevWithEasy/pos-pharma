const cron = require('node-cron')
const Invoice = require('../models/Invoice')
const Customer = require('../models/Customer')

const sheduleTask = () =>{

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(date.getFullYear(), month+1 , 0).getDate()
    const start = `${year}-${String(month + 1).padStart(2, '0')}-01`
    const end = `${year}-${String(month + 1).padStart(2, '0')}-${days}`

    cron.schedule('59 11 * * *' , async()=>{
        const invoices = await Invoice.aggregate([
            {
                $match: {
                  createdAt: {
                    $gte: new Date(start),
                    $lte: new Date(end),
                  },
                },
            },
            {
                $group : {
                    _id : '$customer',
                    value : {
                        $sum : '$paid'
                    }
                }
            }
        ])
        invoices.forEach(async(invoice)=>{
            if( invoice.value < 500 ){
                return
            }else{
                let status
                if(invoice.value >= 500 && invoice.value <1000){
                    return status = 'Silver'
                }else if(invoice.value >= 1000 && invoice.value <1500){
                    return status = 'Gold'
                }else{
                    status = 'Diamond'
                }

                await Customer.findByIdAndUpdate(invoice._id.toHexString(),{
                    $set : {
                        status : status
                    }
                })
            }
        })
    })
}

module.exports = sheduleTask