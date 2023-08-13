const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const adminControllers = require('../controllers/adminControllers');
const router = express.Router();


//Get Method || Users

router.get('/getAllUsers',checkLogin,adminControllers.getAllUsers)


//Get Method || Doctors

router.get('/getAllDoctors',checkLogin,adminControllers.getAllDoctors)

//Post Accocunt Status
router.post('/changeAccountStatus',checkLogin,adminControllers.changeAccountStatus)





module.exports = router;