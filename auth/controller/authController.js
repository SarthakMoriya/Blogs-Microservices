import User from "../model/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectRedis } from "../auth.js";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user == "null" || user == null || user == undefined)
      return res
        .status(200)
        .json({ message: "Invalid credentials", status: "fail", body: {} });
    const isCorrPass = await bcrypt.compare(password, user.password);
    if (isCorrPass) {
      const token = jwt.sign({ id: user._id }, "SECRETS", {
        expiresIn: "2h",
      });
      return res.status(200).json({
        message: "Sign in success",
        status: "success",
        body: { token, id: user._id },
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ message: error?.message, status: "fail", body: {} });
  }
};
export const signup = async (req, res) => {
  try {
    const { email, password, username, imageUrl } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(200)
        .json({ message: "Email already in use", status: "fail", body: {} });
    let hashP = await bcrypt.hash(password, 12);
    const user = (
      await User.create({
        email,
        password: hashP,
        imageUrl,
        username,
      })
    )._doc;

    await handleUserCache(user);
    return res.status(200).json({
      message: "Sign up success",
      status: "success",
      body: {},
    });
  } catch (error) {
    console.log("Returning error");
    return res
      .status(200)
      .json({ message: error?.message, status: "fail", body: {} });
  }
};

const handleUserCache = async (user) => {
  console.log(user);
  const { _id, password, ...others } = user;
  try {
    const redis = await connectRedis();
    if (redis == null) throw new Error("Error connecting to REDIS");
    await redis.hSet(
      "users",
      JSON.stringify(_id),
      JSON.stringify({ ...others })
    );
  } catch (error) {
    console.log(error);
  }
};
