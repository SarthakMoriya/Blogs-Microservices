import User from "../model/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email });
    if (!user.length)
      return res
        .status(200)
        .json({ message: "Invalid credentials", status: "fail", body: {} });
    const isCorrPass = await bcrypt.compare(password, user[0].password);
    if (isCorrPass) {
      const token = jwt.sign({ id: user[0]._id }, "SECRETS", {
        expiresIn: "2h",
      });
      return res.status(200).json({
        message: "Sign in success",
        status: "success",
        body: { token, id: user[0]._id },
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    return res
      .status(200)
      .json({ message: error?.message, status: "fail", body: {} });
  }
};
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(200)
        .json({ message: "Email already in use", status: "fail", body: {} });
    let hashP = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashP });
    return res.status(200).json({
      message: "Sign up success",
      status: "success",
      body: {},
    });
  } catch (error) {
    console.log("Returning error")
    return res
    .status(200)
    .json({ message: error?.message, status: "fail", body: {} });
  }
};
