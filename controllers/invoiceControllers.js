const Customer = require('../models/Customer');
const Invoice = require('../models/Invoice');
const Product = require('../models/Product');

exports.createInvoice=async(req,res,next)=>{
  
    try{
      const findCustomer = await Customer.findOne({phone : req.body.phone})

      const create_new_invoice = async(customer)=>{
        let products = []

        req.body.cart.forEach(product => {
          products.push({
            product : product._id,
            price : product.price,
            quantity : product.qty
          })
        })
        
        const new_invoice = new Invoice({
            customer : customer._id,
            total : req.body.total,
            discount : req.body.discount,
            paid : req.body.paid,
            user : req.user,
            products
        })

        const invoice =  await new_invoice.save()

        invoice.products.forEach(async(item) =>{
          await Product.findByIdAndUpdate(item.product,{
            $inc : {
               quantity : - item.quantity
            }
          })
        })

        res.status(200).json({
            success : true,
            status : 200,
            message : 'Invoice successfully created',
            data : {}
        })
      }

      if(!findCustomer){
        const new_customer = new Customer({
          name : req.body.name,
          phone : req.body.phone
        })
        const customer = await new_customer.save()

        create_new_invoice(customer)

      }else{

        create_new_invoice(findCustomer)

      }
      
    }catch(err){
      res.status(500).json({
          success : false,
          status : 500,
          message : err.message
      })
    }
}

exports.getInvoices=async(req,res,next)=>{
  
  try{
    const invoices = await Invoice.find({}).populate('customer' , '-_id name phone')
    res.status(200).json({
        success : true,
        status : 200,
        message : 'Invoices successfully retrieved',
        data : invoices
    })
  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.getInvoice=async(req,res,next)=>{
  
  try{
    const invoice = await Invoice.findById(req.params.id)
    .populate('customer' , '-_id name phone')
    .populate('user', '-_id name')

    const products = []

    for (const item of invoice.products) {
      const product = await Product.findById(item.product,'-generic -company -createdAt -updatedAt')
      products.push({
        ...product._doc,
        price : item.price,
        quantity : item.quantity
      })
    }

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Invoice retrieved successfully',
        data : {
          ...invoice._doc,
          products
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

exports.deleteInvoice=async(req,res,next)=>{
  
  try{
    const invoice = await Invoice.findById(req.params.id)
    
    invoice.products.forEach(async(product)=>{
      await Product.findByIdAndUpdate(product.product,{
        $inc : {
          quantity : product.quantity
        }
      })
    })
    
    await Invoice.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Invoice deleted successfully',
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