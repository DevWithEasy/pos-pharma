const Customer = require('../models/Customer')
exports.createCustomer=async(req,res,next)=>{
    try{
      const new_customer = new Customer({
        ...req.body
      })
      const customer = await new_customer.save()
      res.status(200).json({
          success : true,
          status : 200,
          message : '',
          data : customer
      })
    }catch(err){
      res.status(500).json({
          success : false,
          status : 500,
          message : err.message
      })
    }
}

exports.findCustomer=async(req,res,next)=>{
  
  try{

    const customer = await Customer.findOne({phone : req.params.phone})
    
    res.status(200).json({
        success : true,
        status : 200,
        message : 'Successfully retrived customer',
        data : customer
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
    const customer = await Customer.findByIdAndUpdate(req.params.id , {
      $set : {
        name : req.body.name,
        phone : req.body.phone
      }
    },
    {new : true}
    )
    res.status(200).json({
        success : true,
        status : 200,
        message : 'Customer successfully updated',
        data : customer
    })
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
    await Customer.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success : true,
        status : 200,
        message : 'Customer successfully deleted',
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

exports.getAllCustomer=async(req,res,next)=>{
  
  try{
    const generics = await Customer.find({})
    res.status(200).json({
        success : true,
        status : 200,
        message : 'Generics retrived successfully',
        data : generics
    })
  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}