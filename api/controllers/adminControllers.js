const express = require('express');
const mongoose = require('mongoose');



//Doctor model create
const doctorSchema = require('../models/doctorModels');
const Doctor = new mongoose.model('Doctor',doctorSchema);

//User model create
const userScheama = require('../models/userModels');
const User = new mongoose.model('User', userScheama)

const getAllUsers = async(req,res,next)=>{
  try{
    const userList = await User.find({}).select('_id name email isAdmin isDoctor')
    
    res.status(200).json({
      success:true,
      message: 'Users data list',
      data:userList

    })
  }catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: "There is a server side error"
    })

  }
}

const getAllDoctors = async(req,res,next)=>{
  try{
    const doctorList = await Doctor.find({})
    res.status(200).json({
      success:true,
      message: 'Doctors data list',
      data:doctorList

    })
  }catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: "There is a server side error"
    })

  }
}

const changeAccountStatus = async(req,res,next)=>{
  try{
    const { doctorId,status } = req.body
   
    const doctor = await Doctor.findByIdAndUpdate(doctorId,
      {
        status
      })
      console.log("1111--->>>",doctor);
     const user = await User.findOne({_id:doctor.userId})
     const notification = user.notification 
     notification.push({
      type:"doctor-account-request-updated",
      message:`Your Doctor Account Requset Has ${status}`,
      onClickPath:'/notification'
     })
    
     if(status === 'approved'){
      user.isDoctor = true 
     }else{
      user.isDoctor = false 
     }
     
     await user.save();
     res.status(201).json({
      success:true,
      message:'Account Status Updated',
      data:doctor
     })
  }catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: "There is a server side error"
    })

  }

}

module.exports = { getAllUsers, getAllDoctors,changeAccountStatus}


