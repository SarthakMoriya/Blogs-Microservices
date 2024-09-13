import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import axios from "axios";

const app = express();
const router= express.Router();
const authRouter= express.Router();
app.use(express.json());
app.use(cors());
app.use('/blogs',router)
app.use('/auth',authRouter)
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    console.log(token)
    console.log(req.headers)
    const validToken = jwt.verify(token, "SECRETS");
    if (validToken) next();
    else
      res.status(401).json({ message: "Expired session Please login again" });
  } catch (error) {
    
    res
      .status(401)
      .json({
        error: "Something went wrong",
        message: "Expired session Please login again",
      });
  }
};

authRouter.post('/login',async(req,res)=>{
  try {
    let data=req.body;
    console.log(data)
    const response=await axios.post('http://auth-srv:3005/auth/login',data)
    const {message,status,body}=response.data
    console.log(response.data)
    res.status(200).json({message,status,body})
  } catch (error) {
    console.log(Object.keys(error))
    res.status(404).json({message:"AUTH SERVICE ERROR",status:"fail",body:{}})
  }
})
authRouter.post('/signup',async(req,res)=>{
  try {
    let data=req.body;
    const response=await axios.post('http://auth-srv:3005/auth/signup',data)
    const {message,status,body}=response.data
    res.status(200).json({message,status,body})
  } catch (error) {
    console.log(Object.keys(error))
    res.status(404).json({message:"AUTH SERVICE ERROR",status:"fail",body:{}})
  }
})

router.post('/create',verifyToken,async (req,res)=>{
  try {
    let data=req.body
    const blog=await axios.post('http://create-srv:3001/create/',data)
    console.log(blog.data)
    res.send(blog.data);
  } catch (error) {
    console.log(error)
  }
})


app.listen(3006,()=>{
  console.log("API GATEWAY listening on port:3006")
})