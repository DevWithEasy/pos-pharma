const Purchase = require("../models/Purchase")
const Product = require("../models/Product")
const User = require("../models/User")

exports.createPurchase=async(req,res,next)=>{
    try{
        req.body.products.forEach(async(product)=>{
            await Product.findByIdAndUpdate(
                product._id,
                {
                    $set : {
                        price: product.price
                    },
                    $inc : {
                        quantity: product.quantity
                    }
                }
            )
        })

        const new_purchase = new Purchase({
            ...req.body,
            user : req.user
        })

        const purchase = await new_purchase.save()

        res.status(200).json({
            success : true,
            status : 200,
            message : 'Purchase successfully created',
            data : purchase
        })
    }catch(err){
        res.status(500).json({
            success : false,
            status : 500,
            message : err.message
        })
    }
}

exports.getAllPurchase=async(req,res,next)=>{
    try{

        const purchases = await Purchase.find({}).populate('user' , '-_id -password')

        res.status(200).json({
            success : true,
            status : 200,
            message : 'Purchase successfully retrived',
            data : purchases
        })
    }catch(err){
        res.status(500).json({
            success : false,
            status : 500,
            message : err.message
        })
    }
}

exports.deletePurchase=async(req,res,next)=>{

    try{
    const purchase = await Purchase.findById(req.params.id)
    
    purchase.products.forEach(async(product)=>{
        await Product.findByIdAndUpdate(product._id,{
            $inc : {
                quantity : - Number(product.quantity)
            }
        })
    })
    
    await Purchase.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Purchase deleted successfully',
        data : {}
    })
    }catch(err){
        res.status(500).json({
            success : false,
            status : 500,
            message : err.message
        })
    }
}