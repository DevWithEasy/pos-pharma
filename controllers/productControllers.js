const Company = require("../models/Company")
const Generic = require("../models/Generic")
const Product = require("../models/Product")

exports.createProduct=async(req,res,next)=>{
    try{
      const new_product = new Product({
        ...req.body
      })
      const product = await new_product.save()
      res.status(200).json({
          success : true,
          status : 200,
          message : 'Product created successfully.',
          data : product
      })
    }catch(err){
      res.status(500).json({
          success : false,
          status : 500,
          message : err.message
      })
    }
}


exports.updateProduct=async(req,res,next)=>{
  
  try{
    const product = await Product.findByIdAndUpdate(req.params.id,{
      $set : {
        name : req.body.name,
        generic : req.body.generic,
        brand : req.body.brand,
        sku : req.body.sku,
        sku_unit : req.body.sku_unit,
        type : req.body.type,
        price : req.body.price,
        quantity : req.body.quantity
      }
    },
    {new : true}
    )

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Product updated successfully.',
        data : product
    })
  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}


exports.deleteProduct=async(req,res,next)=>{
  
  try{
    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Product deleted successfully.',
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

exports.getProduct=async(req,res,next)=>{
  
  try{
    const product = await Product.findById(req.params.id)

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Product retrieved successfully.',
        data : product
    })

  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.getProducts=async(req,res,next)=>{
  
  try{

    const products = await Product.find({})
    .populate('generic' , 'name')
    .populate('company' , 'name')

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Products retrieved successfully.',
        data : products
    })
  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.getProductsByBrand=async(req,res,next)=>{
  
  try{
    const products = await Product.find({
      brand : req.param.id
    })

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Products retrieved successfully.',
        data : products
    })
  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.getProductsByGeneric=async(req,res,next)=>{
  
  try{
    const products = await Product.find({
      generic : req.param.id
    })

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Products retrieved successfully.',
        data : products
    })
  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.getProductsBySearch=async(req,res,next)=>{
  
  try{
    const keyword = req.query.q
        ? {
            $or: [
              { name: { $regex: req.query.q, $options: "i" }},
              { email: { $regex: req.query.q, $options: "i" }},
            ],
          }
        :{}
    const products = await Product.find(keyword).limit(5)

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Products retrieved successfully.',
        data : products
    })
  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.findGenericBrand=async(req,res,next)=>{
  
  try{
    const generics = await Generic.find({})
    const companies = await Company.find({})

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Products retrieved successfully.',
        data : {
          generics,
          companies
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