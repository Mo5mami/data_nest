const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Dataset = require('../models/datasets-meta')
const Contribution = require('../models/contribution')
const mongodb = require('mongodb')
const ObjectId = require('mongodb').ObjectId;
const multer_uploads = require('../config/multer')
const csv         = require('csvtojson')
const  url = "mongodb://localhost:27017/";
User = require('../models/user')
const jwt = require('jsonwebtoken')
const fastcsv = require("fast-csv");
const fs = require('fs')


//helper fucntion t ocreate a csv file containig the labels and path images or data
const   createCompletedCsvFile = async (name,type)=>{
    return new Promise((resolve,rejetct)=>{
        mongodb.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
            if(err) throw new Error('couldn t connect to database')
            client.db("DATANEST")
            .collection(name)
            .find({})
            .project({_id:0,occupied:0,labeled:0})
            .toArray((err, data) => {
            if (err) throw err;
            if(type!=="2d"){
                data.forEach((row)=>{
                    row.URL = row.URL.split('/').slice(-1)[0]
                })
            }
            
            console.log("finished traitement")
            fastcsv
              .write(data, { headers: true })
              .on("finish", function() {
                console.log("file created successfully!");
              })
              .pipe(fs.createWriteStream('src/public/datasets/completed/'+name+'.csv'))
              .on("finish",function(){
                  console.log("finished all")
                  resolve()
              })
              
            })
        })
        
    })
}

var last =  function(array, n) {
    if (array == null) 
      return void 0;
    if (n == null) 
       return array[array.length - 1];
    return array.slice(Math.max(array.length - n, 0));  
    };


    // download a dataset 
router.get('/api/datasets/download',async (req,res)=>{
    
    try{
        const dataset = await Dataset.findOne({name:req.query.name})
        const token = req.header('Authorization').replace('Bearer ','')
        const {_id} = jwt.verify(token,'ahmed')

        if(dataset.owner.toString()!==_id.toString()){
            return res.send({
                success:false,
                message:"This dataset is not yours"
            })
        }
        if(dataset.percentage===100){
            if(fs.existsSync('src/public/datasets/completed/'+req.query.name+'.csv')) {
                res.download('src/public/datasets/completed/'+req.query.name+'.csv')
            }else{
                await createCompletedCsvFile(req.query.name,dataset.type)
                res.download('src/public/datasets/completed/'+req.query.name+'.csv')
            }
            
        }else{
            res.send({
                success:false,
                message:"dataset not labeled yet"
            })
        }
        


    }catch(e){
        res.send({
            success:false,
            message:"problem with the server"
        })
    }
    
    
})

// get all datasets 
router.get('/api/datasets',auth,async(req,res)=>{
     try{
     const all = await Dataset.find()
     res.send({
         success:true,
         datasets:last(all,Number(req.query.number)).reverse()
     })
     }catch(e){
         res.send({
             success:false
         })
     }
 })

 //get all datsets of a single user : 
router.get('/api/mydatasets',auth,async (req,res)=>{
    
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'ahmed')
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
        await user.populate('datasets').execPopulate()

        res.send({
            success:true,
            datasets:last(user.datasets,Number(req.query.number)).reverse()
        })

    }catch(e)
{
    console.log("error",e)
    return res.send({
        success:false,
        message:e
    })
}
})




//user will see all the details about the dataset and how is supposed to label it 
 router.get('/api/datasets/:name',auth,async(req,res)=>{
    try{
    
    const dataset = await Dataset.findOne({name:req.params.name})
    res.send({
        success:true,
        dataset:dataset
        })
    }catch(e){
        res.send({
            success:false,
            message:e
        })
    }

})

// page where user will be labeling data 
router.get('/api/datasets/:name/labeling',auth,async(req,res,next)=>{
    try{
        //else let him get the first row not occupied and not labeled 
        mongodb.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
            if(err) throw new Error('couldn t connect to database')
            client.db("DATANEST")
            .collection(req.params.name)
            .findOne({occupied:false,labeled:false},(err,row)=>{
                if (err) throw err 
                if(!row) res.send({
                                success:false,
                                message:"all rows are labeled"
                                })
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
                    const {completed,_id,occupied,labeled,label,...row_to_send} = row
                    res.send({
                     success:true,
                     row:row_to_send,
                     _id:_id
                    })
                   
                }
                    
            })
        }
        )
    
    }catch(err){
        res.send({
            success:false,
            message:err
        })
    }

})

// updating one row 
router.put('/api/datasets/:name/labeling/:id',auth,async(req,res)=>{
    
    
    try{
        mongodb.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
            if(err) throw new Error('couldnt connect to database')
            client.db("DATANEST")
            .collection(req.params.name)
            .updateOne({_id:ObjectId(req.params.id)},{ $set: { labeled:true,label:req.body.label} },
            async (err,row)=>{
                
                if (err) throw err 
                if(!row) res.send({success:false,message:"error occured , try again"})
                if(row) {
                    const dataset = await Dataset.findOne({name:req.params.name})
                    dataset.percentage +=100/dataset.length
                    if(Number.parseInt(dataset.percentage)==100){
                        dataset.percentage = Number.parseInt(dataset.percentage)
                        dataset.completed=true
                    }
                    req.user.points += dataset.points
                    Contribution
                    .findOneAndUpdate
                    ({owner:req.user._id,dataset:dataset._id},
                        
                    {$inc:{number:1}},
                    async (err,doc)=>{
                    if(!doc){
                    const contribution = new Contribution({owner:req.user._id,dataset:dataset._id,number:1,name:dataset.name})
                    await contribution.save()
                    }
                    })

                    
                    await dataset.save()
                    await req.user.save()
                    res.send({
                        success:true,
                        message:"succesfully updated row"
                    })
                }
            })
        }
        )
    
    }catch(err){
        res.send({
            success:false,
            message:e
        })
    }

})


// upload a dataset 
router.post('/api/datasets/upload',auth,multer_uploads.array('files',10000),async (req,res)=>{
    var type = req.body.type 
    
    if(type=='2d')
    {
        try{
        
        

        //convert csvfile to jsonArray   
        csv().fromFile(req.files[0].path).then(async (jsonObj)=>{
            //add the attribute occupied and labeled or not 
            jsonObj.forEach( (row)=>{
                row.occupied = false
                row.labeled = false 
            })
            const dataset = new Dataset({
                ...req.body,
                owner :req.user._id ,
                length:jsonObj.length
            })
            await dataset.save()

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
            if (e.code===11000){
                return res.send({
                    success:false,
                    message:"this name already exist , choose another name please"
                })
            }else{
                return res.send({
                    success:false,
                    message:e
                })

            }
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
                    owner :req.user._id,
                    length:files.length
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
                        res.send({
                            success:true
                        })
                        })
                    }
                )
                }catch(e){
                    if (e.code===11000){
                        return res.send({
                            success:false,
                            message:"this name already exist , choose another name please"
                        })
                    }else{
                        return res.send({
                            success:false,
                            message:e
                        })
                    }
                }  
}else{
    res.send({
        success:false,
        message:"cannot post this type of data"
    })
}
  
})

//delete his own dataset only 
router.delete('/api/datasets/:name',auth,async (req,res)=>{
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