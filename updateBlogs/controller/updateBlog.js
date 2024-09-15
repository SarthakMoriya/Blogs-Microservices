import { connectToNats } from "../index.js";
import Blog from "../models/blogModel.js";
import nats from "nats";


export const updateBlog = async (req, res) => {
  try {
    const blog=await Blog.findByIdAndUpdate( req.params.id, { ...req.body },{new:true});
    const nc = await connectToNats();
    const sc = nats.StringCodec();
    console.log(blog)
    await nc.publish('update', sc.encode(JSON.stringify({ data: blog }))); 

    return res.status(200).json({message:"blog updated",status:"success",body:{},error:{}})

  } catch (error) {
    console.log(error)
    return res.status(200).json({message:"Error updating Blog",status:"fail",body:{},error:{...error}})
  }
};
