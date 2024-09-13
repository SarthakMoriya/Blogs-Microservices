import { initializeNATS } from "../index.js";
import Blog from "../models/blogModel.js";
import nats from "nats";

const handleNATS = async (id) => {
  const nc = initializeNATS();
  const sc = nats.StringCodec();
  nc.publish("delete", sc.encode(JSON.stringify({ data: id })));
};

export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (deletedBlog) {
      handleNATS(req.params.id);
      return res.status(200).json({
        status: "success",
        message: "Blog deleted successfully",
        body: {},
      });
    } else {
      return res.status(200).json({
        status: "fail",
        message: "Blog not found with id",
        body: {},
      });
    }
  } catch (error) {
    return res.status(200).json({
      status: "fail",
      message: "Error deleting blog",
      body: {},
    });
  }
};
