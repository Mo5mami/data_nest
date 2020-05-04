const mongoose = require('mongoose')

const contributionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User' 
    },
    dataset: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'Dataset' 
    },
    number:{
        type:Number
    },
    name:{
        type:String,
        required:true
    }
}
    ,{
    timestamps:true
})



//defining contribution model
const Contribution = mongoose.model('Contribution',contributionSchema)
module.exports = Contribution 