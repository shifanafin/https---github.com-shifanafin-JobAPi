const User = require('./User')


const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please provide name'],
        maxLength : 50
    },
    position:{
        type:String,
        required:[true,'please provide position'],
        maxLength : 100
    },
    status:{
        type:String,
      enum:['interview','declined','pending'],
      default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,"Please provide user"]

    }


},{timestamps:true})

module.exports=mongoose.model('/jobs',jobSchema)