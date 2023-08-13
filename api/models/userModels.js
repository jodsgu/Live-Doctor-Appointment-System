const mongoose = require('mongoose');

//schema
const userScheama  = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  isDoctor:{
    type:Boolean,
    default:false
  },
  notification:{
    type:Array,
    default:[]
  },
  seennotification:{
    type:Array,
    default:[]
  }
        


})

module.exports = userScheama