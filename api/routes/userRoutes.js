const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const {body,validationResult} = require('express-validator');
const checkLogin = require('../middlewares/checkLogin');

//routes

//Register || POST
router.post('/signup',[
  body('name', 'Enter a valid name').isLength({ min: 3 }).isAlpha(),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 6 charaters').isLength({ min: 6 }),
],userControllers.userSignUp);


//Login || POST
router.post('/login',userControllers.loginUser)
 

//Get user list || POST
router.post('/getUserData',checkLogin,userControllers.getUserData)


//Apply Doctor || POST
router.post('/apply-doctor',[
  body('firstName', 'First name will be minimum 3 letter and alfanumeric').isLength({ min: 3 }).matches(/^[A-Za-z\s]+$/),
  body('lastName', 'Last name First will be minimum 3 letter and alfanumeric').isLength({ min: 3 }).matches(/^[A-Za-z\s]+$/),
  body('phone', 'Phone number must be 10 charaters').isLength({ min: 10 }).isNumeric(),
  body('email', 'Enter a valid email').isEmail(),
  body('address', 'Enter a address').isLength({ min: 5 }),
  body('specialization', 'Specialization is required').notEmpty(),
  body('experience', 'Experience  is required').notEmpty(),
  body('feesPerCunsaltation', 'Enter a valid amount').isNumeric(),
],checkLogin,userControllers.applyDoctor)

//Get all notification || POST
router.post('/get-all-notification',checkLogin,userControllers.getAllNotification)

//Delete all notification || POST
router.post('/delete-all-notification',checkLogin,userControllers.deleteAllNotification)

//Get all doctor
router.post('/getAllDoctors',checkLogin,userControllers.getAllDoctors)

//BOOK APPOINTMENT
router.post("/book-appointment", checkLogin, userControllers.bookAppointment);

//check Appointment
router.post("/check-appointment", userControllers.checkAppointment);

//AppointmentsList
router.post("/user-appointments", userControllers.userAppointmentsList);

module.exports = router;