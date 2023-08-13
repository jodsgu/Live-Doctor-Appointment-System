const express = require('express');
const mongoose = require('mongoose');
const appointmentModel = require("../models/appointmentModel");

//User model create
const userScheama = require('../models/userModels');
const User = new mongoose.model('User', userScheama)

//Doctor model create
const doctorSchema = require('../models/doctorModels');
const Doctor = new mongoose.model('Doctor',doctorSchema);

const getDoctorInfo = async(req,res,next)=>{

  try{
    const  doctor = await Doctor.findOne({userId : req.body.userId})
      res.status(200).json({
        success:true,
        message: 'Doctor data fetch successfuly',
        data: doctor

      })
  }catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: "There is a server side error"
    })

  }

}

const updateDoctorProfile = async(req,res,next)=>{
  try{
      const doctor = await Doctor.findOneAndUpdate({userId: req.body.userId},req.body)
      res.status(201).json({
        success:true,
        message: 'Doctor Profile Update Successfully',
        data: doctor
      })
    }catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: "There is a server side error"
    })

  }
}

const getDoctorById = async(req,res,next)=>{
  try{
    console.log(">>>>>",req);
    const doctor = await Doctor.findOne({_id: req.body.doctorId})
    //const doctor = await Doctor.findOne({_id: req.body._id})
    res.status(200).json({
      success:true,
      message: 'Doctor fetch Successfully',
      data: doctor
    })
  }catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: "There is a server side error"
    })

  }
}
const doctorAppointments = async(req,res,next)=>{
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
}

const updateStatus = async(req,res,next)=>{

  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await User.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
}

module.exports = { getDoctorInfo,updateDoctorProfile,getDoctorById,doctorAppointments,updateStatus}
