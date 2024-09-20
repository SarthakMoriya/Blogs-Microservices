import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: { type: "string", unique: true, required: true,index: true },
  password: { type: "string", required: true },
});


const User=mongoose.model('Users',authSchema);
export default User;