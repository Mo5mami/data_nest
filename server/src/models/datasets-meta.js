const mongoose = require('mongoose')

const datasestSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    type:{
        type:String,
        required:true,
        enum:['images','2d','audio']
    },
    description:{
        type:String,
        required:true
    },
    labels:[{type:String,
    required:true}],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User' 
    },
    points : {
        type:Number,
        required:true
    },
    completed:{
        type: Boolean,
        default: false
    }

})

const Datasets = mongoose.model('Dataset',datasestSchema)
module.exports = Datasets