const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Company = require('../models/Company')
const Generic = require('../models/Generic')
const Customer = require('../models/Customer')
const Product = require('../models/Product')
const Invoice = require('../models/Invoice')
const Purchase = require('../models/Purchase')
const Report = require('../models/Report')

exports.createAdmin=async(req,res,next)=>{
  
  try{
    if(!req.body.name ||!req.body.email || !req.body.phone || !req.body.password){
      return res.redirect('/failed.html')
    }
    const hash_password = await bcrypt.hash(req.body.password,10)

    const new_user = new User({
      ...req.body,
      isAdmin : true,
      password : hash_password
    })

    const user = await new_user.save()

    res.redirect('http://localhost:3000')

  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.signup=async(req,res,next)=>{
  
  try{
    const hash_password = await bcrypt.hash(req.body.password,10)

    const new_user = new User({
      ...req.body,
      password : hash_password
    })

    const user = await new_user.save()

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Successfully Signup.',
        data : user
    })

  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.signin=async(req,res,next)=>{
  
  try{
    const user = await User.findOne({
      $or : [
        {email : req.body.email},
        {phone : req.body.email}
      ]
    })

    if(!user){
      return res.status(405).json({
        success : false,
        status : 405,
        message : 'Not Found any account.'
      })
    }

    const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)

    const isVerified = await bcrypt.compare(req.body.password , user.password)

    if(!isVerified){
      return res.status(405).json({
        success : false,
        status : 405,
        message : 'Credentials wrong.'
      })
    }

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Successfully signin.',
        token : token,
        data : user
    })
  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.updateUser=async(req,res,next)=>{
  
  try{
    console.log(req.body)
    if(req.body.change_password && req.body.new_password){
      const hash_password = await bcrypt.hash(req.body.new_password,10)
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set : {
          name : req.body.name,
          email : req.body.email,
          phone : req.body.phone,
          isAdmin : req.body.isAdmin,
          password : hash_password
        }
      },
      {new : true}
      )

      res.status(200).json({
          success : true,
          status : 200,
          message : 'Successfully updated.',
          data : user
      })
    }else{
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set : {
          name : req.body.name,
          email : req.body.email,
          phone : req.body.phone,
          isAdmin : req.body.isAdmin
        }
      },
      {new : true}
      )

      res.status(200).json({
          success : true,
          status : 200,
          message : 'Successfully updated.',
          data : user
      })
    }
    

  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.deleteUser=async(req,res,next)=>{
  
  try{
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success : true,
        status : 200,
        message : 'User successfully deleted.',
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

exports.getAllUsers=async(req,res,next)=>{
  
  try{
    const users = await User.find({})

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Successfully Signup.',
        data : users
    })

  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.getDashboardData=async(req,res,next)=>{
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(date.getFullYear(), month+1 , 0).getDate()
    const start = `${year}-${String(month + 1).padStart(2, '0')}-01`
    const end = `${year}-${String(month + 1).padStart(2, '0')}-${days}`
  try{
    const users = await User.find({}).countDocuments()
    const companies = await Company.find({}).countDocuments()
    const generics = await Generic.find({}).countDocuments()
    const customers = await Customer.find({}).countDocuments()

    //cuurent month purchase value
    const purchase_current = await Purchase.aggregate([
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
              _id : null,
              value : {
                  $sum : '$total'
              }
          }
      }
    ])

    //curremt month sale value
    const sale_current = await Invoice.aggregate([
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
              _id : null,
              value : {
                  $sum : '$paid'
              }
          }
      }
    ])
    
    //get dashboard stock value price
    const products = await Product.aggregate([
      {
        $project: {
          total_price: { $multiply: ['$price', '$quantity'] }
        }
      },
      {
        $group : {
          _id : null,
          stock_value : {
            $sum : '$total_price'
          },
          total_products : {
            $sum : 1
          }
        }
      }
    ])

    //total purchase value price
    const purchase = await Purchase.aggregate([
      {
        $group : {
          _id : null,
          value : {
            $sum : '$total'
          }
        }
      }
    ])

    //total sales value price
    const sale = await Invoice.aggregate([
      {
        $group : {
          _id : null,
          value : {
            $sum : '$paid'
          }
        }
      }
    ])

    //monthly reports
    const reports = await Report.find({})



    res.status(200).json({
        success : true,
        status : 200,
        message : 'Successfully Signup.',
        data : {
          users,
          companies,
          generics,
          customers,
          current_month : {
            sale : sale_current[0]?.value,
            purchase : purchase_current[0]?.value
          },
          product : products[0],
          total : {
            sale : sale[0]?.value,
            purchase : purchase[0]?.value
          },
          reports
        }
    })

  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}