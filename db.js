const mongoose = require('mongoose');
require('dotenv').config();
const connectDb = async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected successfully on ${mongoose.connection.host}`);

  }catch (err) {
    console.error('Database connection failed:', err.message); 
  }


}
module.exports = connectDb;
