const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const Dataset = require('../models/datasets-meta')
const mongodb = require('mongodb')
const ObjectId = require('mongodb').ObjectId;
const multer_uploads = require('../config/multer')
const csv         = require('csvtojson')
const  url = "mongodb://localhost:27017/";

/// register user 
router.post('/users/register',async (req,res)=>{

    
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
router.post('/users/login',async(req,res)=>{
    
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
router.post('/users/logout',auth,async (req,res)=>{
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
        res.status(500).send({
            success:false,
            message:"cannot logout"
        })
    }
})

// get all datasets 
router.get('/users/datasets',auth,async(req,res)=>{
     try{
     const all = await Dataset.find()
     res.send({
         success:true,
         datasets:all
     })
     }catch(e){
         res.send({
             success:false
         })
     }
 })

//user will see all the details about the dataset and how is supposed to label it 
 router.get('/users/datasets/:name',auth,async(req,res)=>{
    try{
    
    const dataset = await Dataset.findOne({name:req.params.name})
    res.send(dataset)
    }catch(e){
        res.status(400).send(e)
    }

})

// page where user will be labeling data 
router.get('/users/datasets/:name/labeling',auth,async(req,res,next)=>{
    try{
        //else let him get the first row not occupied and not labeled 
        mongodb.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
            if(err) throw new Error('couldn t connect to database')
            client.db("DATANEST")
            .collection(req.params.name)
            .findOne({occupied:false,labeled:false},(err,row)=>{
                if (err) throw err 
                if(!row) res.status(404).send({message:"all rows are labeled"})
                if(row) {

                    client.db('DATANEST').collection(req.params.name)
                    .updateOne({_id:row._id},{ $set: {occupied:true} },(err,result)=>{
                        if (err) throw err 
                        setTimeout(()=>{
                            client.db('DATANEST').collection(req.params.name)
                            .updateOne({_id:row._id},{ $set: {occupied:false} },(err,result)=>{
                                if (err) throw err })
                                
                        },1000*60)
                    })
                    res.send(row)
                   
                }
                    
            })
        }
        )
    
    }catch(err){
        res.status(500).send(err)
    }

})

// updating one row 
router.put('/users/datasets/:name/labeling/:id',auth,async(req,res)=>{
    
    
    try{
        mongodb.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
            if(err) throw new Error('couldnt connect to database')
            client.db("DATANEST")
            .collection(req.params.name)
            .updateOne({_id:ObjectId(req.params.id)},{ $set: { labeled:true,label:req.body.label} },
            async (err,row)=>{
                
                if (err) throw err 
                if(!row) res.status(404).send({message:"error occured , try again"})
                if(row) {
                    const dataset = await Dataset.findOne({name:req.params.name})
                    req.user.points += dataset.points
                    await req.user.save()
                    res.send(row)
                }
            })
        }
        )
    
    }catch(err){
        res.status(500).send(e)
    }

})


// upload a dataset 
router.post('/users/upload',auth,multer_uploads.array('files',10000),async (req,res)=>{
    var type = req.body.type 
    
    if(type=='2d')
    {
        try{
        
        const dataset = new Dataset({
            ...req.body,
            owner :req.user._id 
        })
        await dataset.save()

        //convert csvfile to jsonArray   
        csv().fromFile(req.files[0].path).then((jsonObj)=>{
            //add the attribute occupied and labeled or not 
            jsonObj.forEach((row)=>{
                row.occupied = false
                row.labeled = false 
            })
            
            mongodb.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
                (err, client) => {
                if (err) {
                    return res.status(500).send({error:err})
                }
                client.db("DATANEST")
                    .collection(req.body.name)
                    .insertMany(jsonObj, (err) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    client.close()
                    return res.send({
                        success:true
                    })
                    })
                }
            )   
        })
        }catch(e){
            return res.status(500).send(e)
        }


}else if(type=='images' || type =='audio'){
    const files = req.files 
            const jsonObj = []
            files.forEach((file)=>{
                jsonObj.push({
                    URL:file.path,
                    occupied:false,
                    labeled:false})
            })
            
            
            try{
                const dataset = new Dataset({
                    ...req.body,
                    owner :req.user._id 
                })
                await dataset.save()

                mongodb.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
                    (err, client) => {
                    if (err) {
                        throw err
                    }
                    client.db("DATANEST")
                        .collection(req.body.name)
                        .insertMany(jsonObj, (err) => {
                        if (err) {
                            throw err 
                        }
                        client.close()
                        res.send()
                        })
                    }
                )
                }catch(e){
                    res.status(500).send(e)
                }  
}else{
    res.status(500).send()
}
  
})

//delete his own dataset only 
router.delete('/users/datasets/:name',auth,async (req,res)=>{
    try {
        dataset = await Dataset.findOne({name:req.params.name})
        if(dataset.owner.toString() == req.user._id.toString()){

            mongodb.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
            if (err) throw err
            client.db("DATANEST")
                .collection(req.params.name)
                .drop(async (err,deleteOk)=>{
                    if (err) throw err 
                    if(deleteOk){
                        await Dataset.deleteOne({name:req.params.name})
                        return res.send(dataset)
                    }
                })
            }   
        )}
        else {
            throw new Error()
        }
        }catch(e){
          
            return res.status(404).send({"error":"Forbidden"})
        } 

        
    }
)


module.exports = router 