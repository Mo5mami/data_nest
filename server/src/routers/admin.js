const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth-admin')
const Admin = require('../models/admin')
const Dataset = require('../models/datasets-meta')
const mongodb = require('mongodb')
require('../db/mongoose')
const  url = "mongodb://localhost:27017/"


//temprary registration for admin for tets only 
router.post('/api/admin',async (req,res)=>{
    const admin = new Admin(req.body)
    try{

    await admin.save()
   
    const token = await admin.generateAuthToken()
    res.status(201).send({admin,token})
    }catch(e){
        res.status(400).send(e)
    }
    })


// login 
router.post('/api/admin/login',async(req,res)=>{
    
    try{
    const admin = await Admin.findByCredentials(req.body.pseudo,req.body.password)
    const token = await admin.generateAuthToken()
    
    res.send({admin,token})
    }catch(e){
        res.status(400).send(e)
    }

})
// logout 
router.post('/api/admin/logout',auth,async (req,res)=>{
    try{
        req.admin.tokens = req.admin.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.admin.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/api/admin/dashboard',async(req,res)=>{
     try{
    
     res.send({"dash":"dash"})
     }catch(e){
         res.status(400).send(e)
     }

 })


 //delete any dataset ( when deleting dataset deleted already app crash)
router.delete('/api/admin/datasets/:name',auth,async (req,res)=>{
        try {
            mongodb.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
            if (err) throw err
            client.db("DATANEST")
                  .collection(req.params.name,(err,collection)=>{
                    if (err)  res.status(500).send("errro")
                    collection.drop( (err,deleteOk)=>{
                        if (err) throw err 
                        if(deleteOk){
                            Dataset.deleteOne({name:req.params.name},(err)=>{
                                if (err) throw err
                                return res.send("deleted successfully")
                            })
                        }
                    })
                })
            })
        }catch(e){
            return res.status(404).send({"error":"Forbidden"})
        } 
})



// get all datasets 
router.get('/api/admin/datasets',auth,async(req,res)=>{
    try{
    const all = await Dataset.find()
    res.send(all)
    }catch(e){
        res.status(400).send(e)
    }
})



module.exports = router 