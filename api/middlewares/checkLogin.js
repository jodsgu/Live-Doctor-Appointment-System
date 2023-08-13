const jwt = require("jsonwebtoken");


const checkLogin = (req, res, next) =>{
  
  try{
  
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decode = jwt.verify(token,process.env.JWT_SECRET)
   
    const { id, email, name } = decode;
    req.id = id
    req.email = email
    req.name = name
    next();

  }catch(err){
    next("Authentication Failure...")
  }


}
module.exports = checkLogin;