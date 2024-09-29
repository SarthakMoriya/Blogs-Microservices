import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: { type: "string", unique: true, required: true,index: true },
  password: { type: "string", required: true },
  username: { type: "string", required: true},
  imageUrl: { type: "string", default:"https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"}
});


const User=mongoose.model('Users',authSchema);
export default User;