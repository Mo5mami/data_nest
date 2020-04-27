const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const auth = async (req,res,next)=>{
    try{
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded = jwt.verify(token,'ahmed')
    const admin = await Admin.findOne({_id:decoded._id,'tokens.token':token})
    if(!admin){
        throw new Error()
    }
    req.admin = admin 
    req.token = token 
    next()
}catch(e){
    res.status(500).send({   success:false,
        message:'please authenticate'
    })
}
}

module.exports = auth