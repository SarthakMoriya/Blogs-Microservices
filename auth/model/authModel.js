import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: { type: "string", unique: true, required: true },
  password: { type: "string", required: true },
});


const User=mongoose.model('User',authSchema);
export default User;