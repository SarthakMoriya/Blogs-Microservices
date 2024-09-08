import Blog from "../models/blogModel.js";

export const updateBlog = async (req, res) => {
  try {
    await Blog.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
    res.send("Blog Updated");

  } catch (error) {
    res.send(error);
  }
};
