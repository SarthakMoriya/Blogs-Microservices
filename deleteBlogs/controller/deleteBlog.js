import Blog from "../models/blogModel.js";

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.send("Blog deleted");

  } catch (error) {
    res.send(error);
  }
};
