const mongoose = require('mongoose');
 

//Schema
const doctorSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userId:{
      type:mongoose.Types.ObjectId,
      ref: "User",
      require:true
    },
    firstName:{
      type:String,
      required:true
    },
    lastName:{
      type:String,
      required:true
    },
    phone:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    website:{
      type:String
    },
    address:{
      type:String,
      required:true
    },
    specialization:{
      type:String,
      required:true
    },
    experience:{
      type:String,
      required:true
    },
    feesPerCunsaltation:{
      type:Number,
      required:true
    },
    status:{
      type:String,
      default:'pending'
    },
    timings:{
      type:Object,
      required:false
    }


},{timestamps:true})


module.exports = doctorSchema