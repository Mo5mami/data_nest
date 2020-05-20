const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
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



//get contributions of certain user
router.get('/api/users/contributions',auth,async(req,res)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'ahmed')
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
        await user.populate('contributions').execPopulate()
        return res.send({
            success:true,
            contributions:user.contributions
        })
    }catch(e){
        return res.send({
            success:false,
            message:"cannot find your contributions"
        })

    }
})

router.post('/api/users/sendMail',async (req,res)=>{
try{
    if(req.body.name && req.body.email && req.body.message){
    output = `<h1>Hello Nesi w a7babi</h1>
             <ul>
             <li>Name : ${req.body.name}</li>
             <li>Email : ${req.body.email}</li>
             <li>Message : ${req.body.message}</li>
             </ul> 
    `
    }else{
        res.send({
            success:false,
            message:"problem with data"
        })
    }

    let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "datanest.team@gmail.com", // generated ethereal user
      pass: "azerty!1234" // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    to: "datanest.team@gmail.com",
     // list of receivers
    subject: "Email from datanest landing page", // Subject line
    html: output, // plain text body
  })
  res.send({
    success:true
})
}catch(e){
    res.send({
        success:false,
        message:"cannot send your mail"
    })
}

 

})

//get user with id 
router.get('/api/users/:id',auth,async (req,res)=>{
    try{
         const user = await User.findById(req.params.id)
         res.send({
             success:true,
             user:user
         })
    }catch(e){
        res.send({
            success:false,
            message:"cannot find this user"
        })

    }
})
module.exports = router 