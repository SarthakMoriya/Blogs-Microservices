import Comment from "../model/commentModel.js";
import Blog from "../model/blogModel.js";

export const createComment = async (req, res) => {
  try {
    const { blogId, userId, description } = req.body;
    const comment = new Comment({ blogId, userId, description });
    await comment.save();
    let blog = await Blog.findById(blogId);
    if (blog == null) throw new Error("Couldn't find blog " + blogId);
    blog.comments.push(comment._id);
    await blog.save();
    res.send({ message: "Comment created successfully" });
  } catch (error) {
    res.send({
      message: error?.message || "error creating comment",
      status: "fail",
      body: [],
      error: error?.message,
    });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    let comment = await Comment.findByIdAndDelete(commentId);
    if (comment == null) {
      throw new Error("Comment not found");
    }
    let blog = await Blog.findById(comment.blogId);
    console.log(comment)
    if (blog == null) throw new Error("Couldn't find blog " + blogId);
    blog.comments = blog.comments.filter((comment) => comment._id != commentId);
    await blog.save();
    res.send({
      message: "Comment deleted successfully",
      status: "success",
      body: [],
      error: {},
    });
  } catch (error) {
    console.log(error);
    res.send({
      message: error?.message || "error creating comment",
      status: "fail",
      body: [],
      error: error?.message,
    });
  }
};
