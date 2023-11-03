const Generic = require("../models/Generic")


exports.createGeneric=async(req,res,next)=>{
  
    try{
      const new_generic = new Generic({
        ...req.body
      })

      const generic= await new_generic.save()

      res.status(200).json({
          success : true,
          status : 200,
          message : 'Generic successfully created',
          data : generic
      })
    }catch(err){
      res.status(500).json({
          success : false,
          status : 500,
          message : err.message
      })
    }
}

exports.updateGeneric=async(req,res,next)=>{
  
  try{
    const generic = await Generic.findByIdAndUpdate(req.params.id,{
      $set : {
        name: req.body.name
      }
    },
    {new : true}
    )
    res.status(200).json({
        success : true,
        status : 200,
        message : 'Generic successfully updated',
        data : generic
    })
  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.deleteGeneric=async(req,res,next)=>{
  
  try{
    await Generic.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Generic successfully deleted',
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
  
exports.getAllGeneric=async(req,res,next)=>{
  
  try{
    const generics = await Generic.find({})
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
