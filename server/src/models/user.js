const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:false
    },
    age:{
        type:Number,
        required:false,
        validate(value){
            if(value<0){
                throw new Error('age must be great then 0 ')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    points : {
        type:Number,
        default: 0
    }
},{
    timestamps:true
})

// add virtuela attribute to know all datasets uploaded by a certain user 
userSchema.virtual('datasets',{
    ref:'Dataset',
    localField : '_id',
    foreignField: 'owner'
})


//hash password before saving 
userSchema.pre('save',async function(next){
    
    if(this.isModified('password')){
        
        this.password = await bcrypt.hash(this.password,8)
    }
    
    next()
})

//generating token for authentication for each login
userSchema.methods.generateAuthToken = async function(){
    const user = this 
    const token = jwt.sign({_id:user._id.toString()},"ahmed")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token 
}

//find user by credetials for login 
userSchema.statics.findByCredentials = async function (email,password){
    
    const user = await User.findOne({email})
    if(!user){
        
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
    return user 
}


//return back profile data only
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    return userObject
}
//defining user model
const User = mongoose.model('User',userSchema)

module.exports = User 