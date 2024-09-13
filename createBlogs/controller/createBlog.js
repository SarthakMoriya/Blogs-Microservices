import { connectToNats } from "../index.js";
import Blog from "../models/blogModel.js";


export const createBlog = async (req, res) => {
  try {
    let blog = new Blog({ ...req.body });
    await blog.save();

    const nc = await connectToNats();
    const sc = NATS.StringCodec();
    nc.publish('create', sc.encode(JSON.stringify({ data: blog }))); 

    res.status(200).json({message:"blog created",status:"success",body:{},error:{}})
  } catch (error) {
    console.log("Error "+error)
    res.status(200).json({message:"Error creating blog",status:"fail",body:{},error:{...error?.errorResponse}})
  }
};