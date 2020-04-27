const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const adminSchema = new mongoose.Schema({
    
    pseudo:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
   
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})


//hash password before saving 
adminSchema.pre('save',async function(next){
    
    if(this.isModified('password')){
        
        this.password = await bcrypt.hash(this.password,8)
    }
    
    next()
})

//generating token for authentication for each login
adminSchema.methods.generateAuthToken = async function(){
    const admin = this 
    const token = jwt.sign({_id:admin._id.toString()},"ahmed")
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token 
}

//find user by credetials for login 
adminSchema.statics.findByCredentials = async function (pseudo,password){
    
    const admin = await Admin.findOne({pseudo})
    if(!admin){
        
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password,admin.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
    return admin 
}

//return back profile data only
adminSchema.methods.toJSON = function(){
    const admin = this
    const adminObject = admin.toObject()

    delete adminObject.password
    delete adminObject.tokens
    return adminObject
}
//defining user model
const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin 