import { connectToNats } from "../index.js";
import { createProducer } from "../kafka.js";
import Blog from "../models/blogModel.js";
import nats from "nats";

const handleKafka=async(blog)=>{
  const producer=await createProducer();
  try {
    await producer.send({
      topic:"kafka",
      messages:[{key:"update",value:JSON.stringify(blog)}]
    })
  } catch (error) {
    console.log("Error creating producer, TOPIC:UPDATE")
  }finally{
    await producer.disconnect();
  }
}

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    // const nc = await connectToNats();
    // const sc = nats.StringCodec();
    // console.log(blog);
    // if (blog == null || blog == "null") {
    //   throw new Error("Blog not found");
    // }
    // await nc.publish("update", sc.encode(JSON.stringify({ data: blog })));
    handleKafka(blog);
    return res.status(200).json({
      message: "blog updated",
      status: "success",
      body: {},
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Error updating Blog",
      status: "fail",
      body: {},
      error: { ...error },
    });
  }
};
