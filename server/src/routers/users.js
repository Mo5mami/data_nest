const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

/// register user 
router.post('/api/users/register',async (req,res)=>{

    
    const user = new User({
        ...req.body,
       
    })
    try{
    
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({
        success:true,
        user:user,
        token:token
    })

    }catch(e){
        if(e.code===11000){
            return res.send({
                success:false,
                message:"email already in use"
            })
        }
        return res.status(400).send(e)
    }
    })
// login 
router.post('/api/users/login',async(req,res)=>{
    
    try{
    const user = await User.findByCredentials(req.body.email,req.body.password)
    const token = await user.generateAuthToken()
    res.send({
        success:true,
        user:user,
        token:token
    })

    }catch(e){
        res.send({
            success:false,
            message:"Your mail or your password is invalid"
        })
    }

})

// logout 
router.post('/api/users/logout',auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !== req.token
        })
        await req.user.save()
        res.send({
            success:true,
            payload:null
        })

    }catch(e){
        res.send({
            success:false,
            message:"cannot logout"
        })
    }
})



module.exports = router 