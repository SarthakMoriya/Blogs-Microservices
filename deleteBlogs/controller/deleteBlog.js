import { initializeNATS } from "../index.js";
import Blog from "../models/blogModel.js";
import nats from "nats";

const handleNATS = async (id) => {
 try {
  const nc = await initializeNATS();
  const sc = nats.StringCodec();
  await nc.publish("delete", sc.encode(JSON.stringify({ data: id })));
  console.log("DELETE PUBLISHED")
 } catch (error) {
  console.log("ERROR PUBLOSHIUNG")
 }
};

export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (deletedBlog) {
      // handleNATS(req.params.id);
      const nc =  await initializeNATS();
    const sc = nats.StringCodec();
    await nc.publish('delete', sc.encode(JSON.stringify({ data: req.params.id }))); 
      return res.status(200).json({
        status: "success",
        message: "Blog deleted successfully",
        body: {},
      });
    } else {
      console.log(error)
      return res.status(200).json({
        status: "fail",
        message: "Blog not found with id",
        body: {},
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      status: "fail",
      message: "Error deleting blog",
      body: {},
    });
  }
};
